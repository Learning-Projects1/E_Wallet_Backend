const UserModel = require('../models/UserModel');
const UserAccountModel = require('../models/userAccountModel');
const UserChecksModel = require('../models/userChecksModel');

class UserRepository {
  async createUser(userData) {
    const user = new UserModel(userData);
    return await user.save();
  }

  async createUserAccount(accountData){
    const userAccount = new UserAccountModel(accountData)
    return await userAccount.save()
  }

  async createUserChecks(checkesData){
    const userChecks = new UserChecksModel(checkesData)
    return await userChecks.save()
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

  async getUserAccount(userId){
    return UserAccountModel.findOne({ userId: userId });
  }




}

module.exports = new UserRepository();
