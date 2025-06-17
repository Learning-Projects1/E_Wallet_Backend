const authService = require('../services/authenticationService');
const jwt = require("jsonwebtoken")

class AuthenticationController {



  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////// SignUp Controller ////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async signUp(req, res) {
    try {

      console.log("Signup route hit");
      console.log(req.body);

      const { email, phoneNumber, cnic, password } = req.body;


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
  async login(request, response) {

    try {

      console.log("Login route hit");
      console.log(request.body);

      const { phoneNumber, password } = request.body

      if (!phoneNumber || phoneNumber.trim() === "") {
        return response.status(200).json({
          successful: false,
          code: 400,
          message: "Phone number is required!"
        })
      }

      if (!password || password.trim() === "") {
        return response.status(200).json({
          successful: false,
          code: 400,
          message: "Password is required!"
        })
      }


      const user = await authService.login({ phoneNumber, password })


      /// Token Generation
      let data = {
        time: new Date().toISOString(),
        userId: user.userId
      };

      const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: '10d'
      });


      response.setHeader('auth_token', token)

      return response.status(200).json({
        successful: true,
        code: 200,
        message: "",
        "wrong_phone_password": false,
        "emailVerified": true,
        "phoneVerified": true,
        "data": {
          "profile": user.profile
        }

      })

    } catch (error) {
      return response.status(200).json({
        successful: false,
        code: 400,
        message: "Login Failed!",
        subMessage: error.message
      })
    }


  }

  async verifyWalletPin(request, response) {


    return response.status(200).json({
      successful: true,
      code: 200,
      message: "User Verified Successfully",
    })

  }

}

module.exports = new AuthenticationController();
