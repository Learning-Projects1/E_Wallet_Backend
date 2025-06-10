
class UserController {

    async getHome(req, res){

        try {
            
            console.log('user/home route hit')


            
            return  res.status(200).json({ 
                "successful": true,
                "code": 200,
                "message": "Data fetched successfully",
                "data" : {
                    "currentBalance": "2500.00",

                }
             });


        } catch (error) {
             return  res.status(400).json({ message: 'All fields are required' });
        }


    }

}

module.exports = new UserController();