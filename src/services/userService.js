const userRepository = require("../repositories/userRepository")
const transactionRepository = require('../repositories/transactionRepository')


class UserService {

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////// Get Home Service ////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async getHome(userId) {

        const userAccount = await userRepository.getUserAccountById(userId)

        /// Getting recent transactions list
        const transactionsList = await transactionRepository.getTransactionsByUserId({ userId: userId, limit: 10 })

        ///Changing transaction format
        const transactions = transactionsList.map(tx=> {
                
            let profile;

            if (tx.senderId === userId && tx.receiverRef) {
                profile = {
                    userId: tx.receiverRef.userId,
                    firstName: tx.receiverRef.profile.firstName,
                    lastName: tx.receiverRef.profile.lastName,
                    email: tx.receiverRef.profile.email,
                    phoneNumber: tx.receiverRef.profile.phoneNumber,
                    profileImage: tx.receiverRef.profile?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(tx.receiverRef.profile?.firstName || "User")}&background=random`

                }

            } else if (tx.receiverId == userId && tx.senderRef) {
                profile = {
                    userId: tx.senderRef.userId,
                    firstName: tx.senderRef.profile.firstName,
                    lastName: tx.senderRef.profile.lastName,
                    email: tx.senderRef.profile.email,
                    phoneNumber: tx.senderRef.profile.phoneNumber,
                    profileImage: tx.senderRef.profile?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(tx.senderRef.profile?.firstName || "User")}&background=random`
                }
            }


            return {
                transactionId: tx.transactionId,
                amount: tx.amount,
                senderId: tx.senderId,
                receiverId: tx.receiverId,
                transactionType: tx.transactionType,
                note: tx.note,
                createdAt: tx.createdAt,
                profile: profile
            };

            
        })

        /// Getting Favorites users list
        const favouritesUserList = await userRepository.getFavouritesUsers({userId})

        ///Changing favorites users format
        const favourites = favouritesUserList.map(favUser =>{
            return {
                userId: favUser.userId,
                firstName: favUser.profile.firstName,
                lastName: favUser.profile.lastName,
                email: favUser.profile.email,
                phoneNumber: favUser.profile.phoneNumber,
                profileImage: favUser.profile.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(favUser.profile?.firstName || "User")}&background=random`,
            }
        })

        let data = {
            currentBalance: userAccount.currentBalance,
            favourites: favourites,
            transactions: transactions
        }

        return data;
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////// Sync Contacts Service ///////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async syncContacts(phoneNumber) {

        const userProfile = await userRepository.findByPhoneNumber(phoneNumber)
        return userProfile;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////// Get Transaction History Service /////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async getTransactionHistory(userId) {

        const transactionsList = await transactionRepository.getTransactionsByUserId({ userId: userId, limit: null })


        const transactionsWithProfile = transactionsList.map(tx => {

            let profile;


            if (tx.senderId === userId && tx.receiverRef) {
                profile = {
                    userId: tx.receiverRef.userId,
                    firstName: tx.receiverRef.profile.firstName,
                    lastName: tx.receiverRef.profile.lastName,
                    email: tx.receiverRef.profile.email,
                    phoneNumber: tx.receiverRef.profile.phoneNumber,
                    profileImage: tx.receiverRef.profile?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(tx.receiverRef.profile?.firstName || "User")}&background=random`

                }

            } else if (tx.receiverId == userId && tx.senderRef) {
                profile = {
                    userId: tx.senderRef.userId,
                    firstName: tx.senderRef.profile.firstName,
                    lastName: tx.senderRef.profile.lastName,
                    email: tx.senderRef.profile.email,
                    phoneNumber: tx.senderRef.profile.phoneNumber,
                    profileImage: tx.senderRef.profile?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(tx.senderRef.profile?.firstName || "User")}&background=random`
                }
            }


            return {
                transactionId: tx.transactionId,
                amount: tx.amount,
                senderId: tx.senderId,
                receiverId: tx.receiverId,
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