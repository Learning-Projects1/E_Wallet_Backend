const authService = require('../services/authenticationService');

class AuthenticationController {



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// SignUp Controller ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async signUp(req, res) {
    try {

        console.log("Signup route hit");
        console.log(req.body);

      const { email, phoneNumber , cnic, password } = req.body;

      
      if (!email || !phoneNumber || !cnic || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const user = await authService.signUp({ email, phoneNumber, cnic, password });

      res.status(201).json({
        message: 'User created successfully',
        userId: user._id,
        email: user.email,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// Login Controller /////////////////////////////?///////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async login(req, res){

    try{

        console.log("Login route hit");
        console.log(req.body);

        const {phoneNumber, password} = req.body

        if(!phoneNumber || phoneNumber.trim() === ""){
          return res.status(200).json({
            successful : false,
            code : 400,
            message : "Phone number is required!"
          })
        }

        if(!password || password.trim() === ""){
          return res.status(200).json({
            successful : false,
            code : 400,
            message : "Password is required!"
          })
        }


        const user = await authService.login({phoneNumber, password})

        return res.status(200).json({
            successful : true,
            code : 200,
            message : "",
            "wrong_phone_password": false,
            "emailVerified": true,
            "phoneVerified": true,
            "data" : {
            "profile" : user.profile
            }

        })

    }catch(error){
        return res.status(200).json({
            successful : false,
            code : 400,
            message : "Login Failed!",
            subMessage : error.message
        })
    }

    
  }

}

module.exports = new AuthenticationController();
