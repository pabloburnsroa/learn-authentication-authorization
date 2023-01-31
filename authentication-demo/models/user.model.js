const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username cannot be black'],
  },
  password: {
    type: String,
    required: [true, 'Password cannot be black'],
  },
});

userSchema.statics.validateUser = async function (username, password) {
  const user = await this.findOne({ username });
  const validated = await bcrypt.compare(password, user.password);
  return validated ? user : false;
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
