const mongoose = require("mongoose");
const { Schema } = mongoose;



const transactionSchema = new mongoose.Schema({

    transactionId: { type: String, unique: true, require: true },

    senderId: { type: Schema.Types.ObjectId, ref: 'users', required: true },

    receiverId: { type: Schema.Types.ObjectId, ref: 'users', required: true  },

    amount: { type: Number, require: true, default : 0 },

    transactionType: { type: String, require: true },

    createdAt: { type: Date, default : new Date() },


})


module.exports = mongoose.model('transactions', transactionSchema)