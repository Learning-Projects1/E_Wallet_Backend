
const userService = require('../services/userService');
const { authenticateToken } = require('../utils/tokenAuthentication');
const jwt = require('jsonwebtoken')

class UserController {

    async getHome(request, response) {

        try {


            // authenticateToken(request, response)
        

            const token = request.header['auth_token']

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            userId =  decoded.userId; 
            


            const userAccount = await userService.getHome(userId)

            console.log(userAccount.currentBalance.toString())

            return response.status(200).json({
                "successful": true,
                "code": 200,
                "message": "Data fetched successfully",
                "data": {
                    "currentBalance": userAccount.currentBalance
                }
            });


        } catch (error) {
            return response.status(400).json({ message: error.message });
        }


    }

}

module.exports = new UserController();