
const userService = require('../services/userService');
const { authenticateToken } = require('../utils/tokenAuthentication');


class UserController {


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// Get Home  ///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getHome(request, response) {

        try {

            ///Authenticating bearer token
            const userId = await authenticateToken(request, response)
            if(!userId){
                return
            }

            const data = await userService.getHome(userId)


            return response.status(200).json({
                "successful": true,
                "code": 200,
                "message": "Data fetched successfully",
                "data": data
            });


        } catch (error) {
            return response.status(200).json({
                "isSuccessful": false,
                "code": 400,
                "message": error.message
            });
        }


    }



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// Sync Contacts  //////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// Get Transaction History  ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    async getTransactionHistory(request, response){
        try {

            ///Authenticating bearer token
            const userId = await authenticateToken(request, response)
            if (!userId) {
                return
            }

            const transactionsList = await userService.getTransactionHistory(userId)


            return response.status(200).json({
                "successful": true,
                "code": 200,
                "message": "",
                "data": transactionsList
            });


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