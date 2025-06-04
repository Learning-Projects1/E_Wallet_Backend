const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');

class UserService {
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
}

module.exports = new UserService();
