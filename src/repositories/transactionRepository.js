const transactionModel = require('../models/transactionModel');
const userAccountModel = require('../models/userAccountModel');

class TransactionRepository {

  async createTransaction(transactionData, session = null) {
    const newTransaction = new transactionModel(transactionData);
    const saved = await newTransaction.save({ session });

    // Convert to plain object and remove sensitive fields
    const { senderRef, receiverRef, _id, __v, ...filtered } = saved.toObject();

    return filtered;
  }

  async getUserAccountById(userId, session = null) {
    return userAccountModel.findOne({ userId }).session(session);
  }

  async updateUserAccountBalance({ userId, currentBalance }, session = null) {
    return userAccountModel.findOneAndUpdate(
      { userId },
      { currentBalance },
      { session, new: true } // `new: true` returns the updated doc
    );
  }


  async getTransactionsByUserId(userId) {

    return transactionModel.find({
      $or: [{ senderId: userId }, { receiverId: userId }]
    })
      .select({
        _id: 0,
        __v: 0
      })
      .populate({
        path: 'senderRef',
        select: {
          userId: 1,
          'profile.firstName': 1,
          'profile.lastName': 1,
          'profile.email': 1,
          'profile.phoneNumber': 1
        }
      })
      .populate({
        path: 'receiverRef',
        select: {
          userId: 1,
          'profile.firstName': 1,
          'profile.lastName': 1,
          'profile.email': 1,
          'profile.phoneNumber': 1
        }
      })



  }


}

module.exports = new TransactionRepository();
