const mongoose = require("mongoose");


const userAccountSchema = new mongoose.Schema({

    userId: { type: String, unique: true, require: true },

    cardNumber: { type: String, default: "" },

    currentBalance: { type: Number, default: 0 },

    accountLimits: {

        totalLimit: { type: Number, default: 500000 },

        availableLimit: { type: Number, default: 500000 }
    },

    transferLimits: {

        totalTransferLimit: { type: Number, default: 100000 },

        availableTransferLimit: { type: Number, default: 100000 },

        lastTransferDate: { type: Date, default: Date.now() }
    },

})


module.exports = mongoose.model('user_account', userAccountSchema)