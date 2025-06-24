
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userChecksSchema = new mongoose.Schema({

    userId: { type: String, unique: true, require: true },

    userRef: { type: Schema.Types.ObjectId, ref: 'users', required: true, unique : true },

    isProfileSetUp : { type : Boolean, default : false },

    isPhoneNumberVerified : { type : Boolean, default : false },

    isCardLinked : { type : Boolean, default : false },

    isEmailVerified : { type : Boolean, default : false },

    isWalletPinSetUp : { type : Boolean, default : false },
})

module.exports = mongoose.model('user_checks', userChecksSchema)