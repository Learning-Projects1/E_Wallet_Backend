const userRepository = require("../repositories/userRepository")


class UserService {


    async getHome({userId}){
        
        const userAccount = await userRepository.getUserAccount(userId)
        return userAccount;
    }


}

module.exports = new UserService();