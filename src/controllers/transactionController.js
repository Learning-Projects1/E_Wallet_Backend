
const transactionService = require('../services/transactionService');
const { authenticateToken } = require('../utils/tokenAuthentication');


class TransactionController {


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// Wallet Transfer /////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async walletTransfer(request, response) {

        try {

            ///Authenticating bearer token
            const userId = await authenticateToken(request, response)
            if(!userId){
                return
            }

            let transactionDetails = transactionService.performWalletTransfer(request,userId)


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