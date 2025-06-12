
const mongoose = require('mongoose')


const userChecksSchema = new mongoose.Schema({
    isProfileSetUp : { type : Boolean, default : false },
    isPhoneNumberVerified : { type : Boolean, default : false },
    isCardLinked : { type : Boolean, default : false },
    isEmailVerified : { type : Boolean, default : false },
    isWalletPinSetUp : { type : Boolean, default : false },
})

module.exports = mongoose.model('user_checks', userChecksSchema)