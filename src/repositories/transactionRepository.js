const transactionModel = require('../models/transactionModel');
const userAccountModel = require('../models/userAccountModel');

class TransactionRepository {

  async createTransaction(transactionData) {
    const newTransaction = new transactionModel(transactionData);
    return await newTransaction.save();
  }


  async getUserAccount(userId){
    return userAccountModel.findOne({ userId: userId });
  }

  async updateUserAccountBalance({userId, currentBalance}){
    return userAccountModel.findOneAndUpdate({
        userId : userId
    },{
        currentBalance : currentBalance
    })
  }

}

module.exports = new TransactionRepository();
