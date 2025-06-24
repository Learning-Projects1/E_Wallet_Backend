const mongoose = require("mongoose")
const transactionModel = require("../models/transactionModel")
const transactionRepository = require("../repositories/transactionRepository")
const userRepository = require("../repositories/userRepository")
const uuid = require('uuid')


class TransactionService {


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////// Wallet Transfer /////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async performWalletTransfer({ request, senderUserId }) {


        const session = await mongoose.startSession();
        session.startTransaction();

        try {


            const receiverAccountNo = request.body.accountNumber
            const amount = Number(request.body.amount)
            const note = request.body.note



            if (!receiverAccountNo || receiverAccountNo === "") {
                throw new Error("Account No. is required")
            }


            if (!amount || isNaN(amount) || amount <= 0) {
                throw new Error("Invalid transfer amount")
            }


            ///Getting Sender account details
            const senderAccount = await transactionRepository.getUserAccountById(senderUserId)
            const receiverProfile = await userRepository.findByPhoneNumber(receiverAccountNo)


            if (!receiverProfile) {
                throw new Error("No account exist on this number!")
            }


            if (senderUserId === receiverProfile.userId) {
                throw new Error("Sender and receiver accounts must not be same!")
            }



            ///Getting Receiver account details
            const receiverAccount = await transactionRepository.getUserAccountById(receiverProfile.userId)



            if (senderAccount.currentBalance < amount) {
                throw new Error("Insufficient wallet balance!")
            }
            
            let senderBalanceBeforeTransaction = senderAccount.currentBalance
            let receiverBalanceBeforeTransaction = receiverAccount.currentBalance

           
            ///Performing transaction
            var transactionData = new transactionModel({
                transactionId: uuid.v4(),
                senderId : senderUserId,
                senderRef: senderAccount.userRef._id,
                receiverId : receiverProfile.userId,
                receiverRef: receiverAccount.userRef._id,
                amount: amount,
                transactionType: "wallet_transfer",
                note: note
            })
            let transactionResult = await transactionRepository.createTransaction(transactionData,session)


            ///Updating sender balance
            let senderUpdatedBalance = senderBalanceBeforeTransaction - amount
            await transactionRepository.updateUserAccountBalance({
                userId: senderUserId,
                currentBalance: senderUpdatedBalance
            },session)


            /// Updating receiver balance
            let receiverUpdatedBalance = receiverBalanceBeforeTransaction + amount
            await transactionRepository.updateUserAccountBalance({
                userId: receiverAccount.userId,
                currentBalance: receiverUpdatedBalance
            },session)



            await session.commitTransaction();

            return transactionResult



        } catch (error) {
            await session.abortTransaction();
            throw error;
       
        } finally {
            session.endSession();
        }

    }


}

module.exports = new TransactionService();