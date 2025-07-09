const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

      userId : { type : String, unique : true, require : true},

      profile :{
        firstName: { type: String, default : "" },
        lastName: { type: String, default : "" },
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: true, unique: true },
        cnic: { type: String, required: true, unique: true },
        profileImage: { type: String, default : "" },
      },


      password: { type: String, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('users', userSchema);
