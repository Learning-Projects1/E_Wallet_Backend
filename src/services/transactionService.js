const transactionModel = require("../models/transactionModel")
const transactionRepository = require("../repositories/transactionRepository")
const uuid = require('uuid')


class TransactionService {

    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// Wallet Transfer /////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async performWalletTransfer(request, userId){

        const receiverAccountNo = request.accountNumber
        const amount = parseFloat(request.amount)
        const note = request.note


        if(userId === receiverAccountNo){
            throw new Error("Sender and receiver accounts must not be same!")
        }


        const senderAccount = await transactionRepository.getUserAccount(userId)
        const receiverAccount = await transactionRepository.getUserAccount(accountNumber)


        if(!receiverAccount){
            throw new Error("No account exist on this number!")
        }


        if(senderAccount.currentBalance < amount){
            throw new Error("Insufficient wallet balance!")
        }


        let senderBalanceBeforeTransaction = senderAccount.currentBalance
        let receiverBalanceBeforeTransaction = receiverAccount.currentBalance

        ///Performing transaction
        var transactionData = new transactionModel({
            transactionId : uuid.v4().trim(),
            senderId : userId,
            receiverId : receiverAccount.userId,
            amount : amount,
            transactionType : "wallet_transfer",
            note : note
        })


        let transactionData = await transactionRepository.createTransaction(transactionData)


        ///Updating sender balance
        let senderUpdatedBalance = senderBalanceBeforeTransaction - amount
        await transactionRepository.updateUserAccountBalance({
            userId : userId,
            currentBalance : senderUpdatedBalance
        })


        /// Updating receiver balance
        let receiverUpdatedBalance = receiverBalanceBeforeTransaction + amount
        await transactionRepository.updateUserAccountBalance({
            userId : receiverAccount.userId,
            currentBalance : receiverUpdatedBalance
        })

        return transactionData

    }


}

module.exports = new TransactionService();