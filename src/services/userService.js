const userRepository = require("../repositories/userRepository")
const transactionRepository = require('../repositories/transactionRepository')


class UserService {


    async getHome(userId){
        
        const userAccount = await userRepository.getUserAccountById(userId)
        return userAccount;
    }

    async syncContacts(phoneNumber){
        
        const userProfile = await userRepository.findByPhoneNumber(phoneNumber)
        return userProfile;
    }
    

    async getTransactionHistory(userId){
        
        const transactionsList = await transactionRepository.getTransactionsByUserId(userId)


        ///To do : Attach the profile info to transaction
        // await transactionsList.forEach(async function (singleTransaction){
            
        // })


        return transactionsList;
    }

}

module.exports = new UserService();