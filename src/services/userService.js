const userRepository = require("../repositories/userRepository")


class UserService {


    async getHome(userId){
        
        const userAccount = await userRepository.getUserAccount(userId)
        return userAccount;
    }

    async syncContacts(phoneNumber){
        
        const userProfile = await userRepository.findByPhoneNumber(phoneNumber)
        return userProfile;
    }


}

module.exports = new UserService();