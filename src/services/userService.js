const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');
const User = require('../models/User');

class UserService {

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

    // Create user
    const user = await userRepository.create({
      email,
      phoneNumber,
      cnic,
      password: hashedPassword,
    });

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


    return user

  }

}

module.exports = new UserService();
