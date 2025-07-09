const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel');
const UserAccountModel = require('../models/userAccountModel');
const UserChecksModel = require('../models/userChecksModel');
const userRepository = require("../repositories/userRepository")
const transactionRepository = require("../repositories/transactionRepository")
const uuid = require('uuid');

class AuthenticationService {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// SignUp Service ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async signUp({ email, phoneNumber, cnic, password }) {
    // Check if user already exists
    const emailExists = await userRepository.findByEmail(email);
    if (emailExists) throw new Error('Email already in use');

    const phoneExists = await userRepository.findByPhoneNumber(phoneNumber);
    if (phoneExists) throw new Error('Phone number already in use');

    const cnicExists = await userRepository.findByCnic(cnic);
    if (cnicExists) throw new Error('CNIC already in use');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = uuid.v4().trim()

    /// Creating user
    const userData = UserModel({
      userId : userId,
      profile : {
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        cnic: cnic.trim()
      },
      password : hashedPassword.trim()
    })

    const user = await userRepository.createUser( userData );


    ///Createing User Account
    const userAccount = UserAccountModel({
      userRef :  user._id,
      userId : user.userId
    })
    await userRepository.createUserAccount(userAccount)

    ///Creating user checks
    const userChecksData = UserChecksModel({
      userId : userId,
      userRef : user._id
    })
    await userRepository.createUserChecks(userChecksData)

    return user;
  }



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// Login Service ////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async login({phoneNumber, password}){

    var user = await userRepository.findByPhoneNumber(phoneNumber)

    if(!user){
      throw new Error("User does not exist")
    }

    const isPasswordMatched = bcrypt.compare(password,user.password)

    if(!isPasswordMatched){
      throw new Error("Incorrect password")
    }

    const userAccount = await userRepository.getUserAccountById(user.userId)

    const data = {
      user_id: user.userId,
      profile: user.profile,
      accountDetails: userAccount 
    }

    return data

  }

}

module.exports = new AuthenticationService();
