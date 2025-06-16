const userModel = require('../models/UserModel');
const userAccountModel = require('../models/userAccountModel');
const userChecksModel = require('../models/userChecksModel');

class UserRepository {
  async createUser(userData) {
    const user = new userModel(userData);
    return await user.save();
  }

  async createUserAccount(accountData){
    const userAccount = new userAccountModel(accountData)
    return await userAccount.save()
  }

  async createUserChecks(checkesData){
    const userChecks = new userChecksModel(checkesData)
    return await userChecks.save()
  }

  async findByEmail(email) {
    return await userModel.findOne({ 'profile.email' : email });
  }

  async findByPhoneNumber(phoneNumber) {
    return await userModel.findOne({ 'profile.phoneNumber' : phoneNumber});
  }

  async findByCnic(cnic) {
    return await userModel.findOne({ 'profile.cnic' : cnic });
  }

  async getUserAccount(userId){
    return userAccountModel.findOne({ userId: userId });
  }




}

module.exports = new UserRepository();
