const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

      userId : { type : String, unique : true, require : true},

      profile :{
        firstName: { type: String, default : "" },
        lastName: { type: String, default : "" },
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: true, unique: true },
        cnic: { type: String, required: true, unique: true },
      },


      password: { type: String, required: true },


      accountDetails: {

        cardNumber: {   type: String,default: ""},

        currentBalance: { type: Number,  default: 0},

        accountLimits: {

            totalLimit: {  type: Number, default: 500000},

            availableLimit: {  type: Number,default: 500000 }
        },

        transferLimits: {

            totalTransferLimit: { type: Number,default: 100000},

            availableTransferLimit: {type: Number,default: 100000},

            lastTransferDate: {type: Date,default: Date.now()}
        },

      },

}, {
  timestamps: true,
});

module.exports = mongoose.model('UserModel', userSchema);
