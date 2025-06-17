
const userService = require('../services/userService');
const { authenticateToken } = require('../utils/tokenAuthentication');


class UserController {

    async getHome(request, response) {

        try {

            ///Authenticating bearer token
            const userId = await authenticateToken(request, response)
            if (!userId) {
                return
            }

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
            return response.status(200).json({
                "isSuccessful": false,
                "code": 400,
                "message": error.message
            });
        }


    }


    async syncContacts(request, response) {
        try {


            ///Authenticating bearer token
            const userId = await authenticateToken(request, response)
            if (!userId) {
                return
            }

            var phoneNumber = request.body.contacts[0];

            let user = await userService.syncContacts(phoneNumber)

            return response.status(200).json({
                "successful": true,
                "code": 200,
                "message": "Contacts synced successfully",
                "data": [
                    {
                        "profile": user.profile,
                        "user_id": user.userId
                    },
                ]
            })


        } catch (error) {
            return response.status(200).json({
                "isSuccessful": false,
                "code": 400,
                "message": error.message
            });
        }
    }



}

module.exports = new UserController();