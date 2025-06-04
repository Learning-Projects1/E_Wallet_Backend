const User = require('../models/User');

class UserRepository {
  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findByPhoneNumber(phoneNumber) {
    return await User.findOne({ phoneNumber});
  }

  async findByCnic(cnic) {
    return await User.findOne({ cnic });
  }
}

module.exports = new UserRepository();
