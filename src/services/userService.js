const userRepository = require("../repositories/userRepository")
const transactionRepository = require('../repositories/transactionRepository')


class UserService {


    async getHome(userId) {

        const userAccount = await userRepository.getUserAccountById(userId)
        return userAccount;
    }

    async syncContacts(phoneNumber) {

        const userProfile = await userRepository.findByPhoneNumber(phoneNumber)
        return userProfile;
    }


    async getTransactionHistory(userId) {

        const transactionsList = await transactionRepository.getTransactionsByUserId(userId)


      const transactionsWithProfile =  transactionsList.map(tx => {

            let profile;

            if (tx.senderId === userId && tx.receiverRef) {
                profile = {
                    userId: tx.receiverRef.userId,
                    firstName: tx.receiverRef.profile.firstName,
                    lastName: tx.receiverRef.profile.lastName,
                    email: tx.receiverRef.profile.email,
                    phoneNumber: tx.receiverRef.profile.phoneNumber,
                }

            } else if (tx.receiverId == userId && tx.senderRef) {
                profile = {
                    userId: tx.senderRef.userId,
                    firstName: tx.senderRef.profile.firstName,
                    lastName: tx.senderRef.profile.lastName,
                    email: tx.senderRef.profile.email,
                    phoneNumber: tx.senderRef.profile.phoneNumber,
                }
            }


            return {
                transactionId: tx.transactionId,
                amount: tx.amount,
                senderId : tx.senderId,
                receiverId : tx.receiverId,
                transactionType: tx.transactionType,
                note: tx.note,
                createdAt: tx.createdAt,
                profile
            };

        })

        return transactionsWithProfile;
    }

}

module.exports = new UserService();