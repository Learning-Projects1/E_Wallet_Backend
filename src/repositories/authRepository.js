const UserModel = require('../models/UserModel');

class AuthRepository {
  async create(userData) {
    const user = new UserModel(userData);
    return await user.save();
  }

  async findByEmail(email) {
    return await UserModel.findOne({ 'profile.email' : email });
  }

  async findByPhoneNumber(phoneNumber) {
    return await UserModel.findOne({ 'profile.phoneNumber' : phoneNumber});
  }

  async findByCnic(cnic) {
    return await UserModel.findOne({ 'profile.cnic' : cnic });
  }

}

module.exports = new AuthRepository();
