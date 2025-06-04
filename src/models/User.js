const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  cnic: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
