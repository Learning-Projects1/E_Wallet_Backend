const userRepository = require("../repositories/userRepository")
const transactionRepository = require('../repositories/transactionRepository')


class UserService {


    async getHome(userId){
        
        const userAccount = await userRepository.getUserAccount(userId)
        return userAccount;
    }

    async syncContacts(phoneNumber){
        
        const userProfile = await userRepository.findByPhoneNumber(phoneNumber)
        return userProfile;
    }
    

    async getTransactionHistory(userId){
        
        const transactions = await transactionRepository.getTransactionsByUserId(userId)
        return transactions;
    }

}

module.exports = new UserService();