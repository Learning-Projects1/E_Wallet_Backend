const bcrypt = require('bcryptjs');
const authRepository = require('../repositories/authRepository');
const UserModel = require('../models/UserModel');
const uuid = require('uuid');

class UserService {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// SignUp Service ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async signUp({ email, phoneNumber, cnic, password }) {
    // Check if user already exists
    const emailExists = await authRepository.findByEmail(email);
    if (emailExists) throw new Error('Email already in use');

    const phoneExists = await authRepository.findByPhoneNumber(phoneNumber);
    if (phoneExists) throw new Error('Phone number already in use');

    const cnicExists = await authRepository.findByCnic(cnic);
    if (cnicExists) throw new Error('CNIC already in use');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userData = UserModel({
      userId : uuid.v4().trim(),
      profile : {
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        cnic: cnic.trim()
      },
      password : hashedPassword.trim()
    })

    const user = await authRepository.create( userData );

    return user;
  }



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// Login Service ////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async login({phoneNumber, password}){

    var user = await authRepository.findByPhoneNumber(phoneNumber)

    if(!user){
      throw new Error("User does not exist")
    }

    const isPasswordMatched = bcrypt.compare(password,user.password)

    if(!isPasswordMatched){
      throw new Error("Incorrect password")
    }


    return user

  }

}

module.exports = new UserService();
