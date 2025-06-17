
const transactionService = require('../services/transactionService');
const { authenticateToken } = require('../utils/tokenAuthentication');


class TransactionController {


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// Wallet Transfer /////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async walletTransfer(request, response) {

        try {


            console.log(JSON.stringify(request.form, null, 2));

            ///Authenticating bearer token
            const userId = await authenticateToken(request, response)
            if(!userId){
                return
            }

            let transactionDetails = await transactionService.performWalletTransfer({request : request,senderUserId : userId})


            return response.status(200).json({
                "successful": true,
                "code": 200,
                "message": "Amount transfer successfully!",
                "data": transactionDetails
            });


        } catch (error) {
            return response.status(200).json({ 
                "isSuccessful": false,
                "code" : 400,                
                "message": error.message 
            });
        }


    }

}

module.exports = new TransactionController();