const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const GeoLocation = require('./geoLocation');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: GeoLocation,
    required: true
  }
});

UserSchema.pre('save', async function(next) {
  //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
  //your application becomes.
  const hash = await bcrypt.hash(this.password, 1);
  this.password = hash;
  next();
});

//We'll use this later on to make sure that the user trying to log in has the correct credentials
UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  //Hashes the password sent by the user for login and checks if the hashed password stored in the
  //database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
