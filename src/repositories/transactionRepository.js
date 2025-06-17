const transactionModel = require('../models/transactionModel');
const userAccountModel = require('../models/userAccountModel');

class TransactionRepository {

  async createTransaction(transactionData, session = null) {
    const newTransaction = new transactionModel(transactionData);
    return await newTransaction.save({ session });
  }

  async getUserAccount(userId, session = null) {
    return userAccountModel.findOne({ userId }).session(session);
  }

  async updateUserAccountBalance({ userId, currentBalance }, session = null) {
    return userAccountModel.findOneAndUpdate(
      { userId },
      { currentBalance },
      { session, new: true } // `new: true` returns the updated doc
    );
  }


  async getTransactionsByUserId(userId){
    return transactionModel.find({
      $or : [{senderId : userId}, {receiverId : userId}]
    }).select({
      _id: 0,
      __v: 0
    })
  }

  
}

module.exports = new TransactionRepository();
