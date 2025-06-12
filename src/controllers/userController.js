
const userService = require('../services/userService')

class UserController {

    async getHome(req, res){

        try {

            //Todo : get this user id from request header jwt token
            const userId = "f104211b-b23d-4754-9b0f-9354748a61c1"

            const userAccount = await userService.getHome(userId)
            
            return  res.status(200).json({ 
                "successful": true,
                "code": 200,
                "message": "Data fetched successfully",
                "data" : {
                    "currentBalance": userAccount.currentBalance
                }
             });


        } catch (error) {
             return  res.status(400).json({ message: error.message });
        }


    }

}

module.exports = new UserController();