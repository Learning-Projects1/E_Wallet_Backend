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


            var receiverAccountNo = request.body.accountNumber
            const amount = Number(request.body.amount)
            const note = request.body.note



            if (!receiverAccountNo || receiverAccountNo === "") {
                throw new Error("Account No. is required")
            }

            /// Converting %2B to + in phone number
            receiverAccountNo = decodeURIComponent(receiverAccountNo)


            if (!amount || isNaN(amount) || amount <= 0) {
                throw new Error("Invalid transfer amount")
            }


            ///Getting Sender account details
            const senderAccount = await transactionRepository.getUserAccount(senderUserId)
            const receiverProfile = await userRepository.findByPhoneNumber(receiverAccountNo)


            if (!receiverProfile) {
                throw new Error("No account exist on this number!")
            }

            const receiverUserId = receiverProfile.userId


            if (senderUserId === receiverUserId) {
                throw new Error("Sender and receiver accounts must not be same!")
            }




            ///Getting Receiver account details
            const receiverAccount = await transactionRepository.getUserAccount(receiverUserId)



            if (senderAccount.currentBalance < amount) {
                throw new Error("Insufficient wallet balance!")
            }


            let senderBalanceBeforeTransaction = senderAccount.currentBalance
            let receiverBalanceBeforeTransaction = receiverAccount.currentBalance



            ///Performing transaction
            var transactionData = new transactionModel({
                transactionId: uuid.v4(),
                senderId: senderUserId,
                receiverId: receiverAccount.userId,
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