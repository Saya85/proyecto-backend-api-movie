const UserSchema = require('./schemas/UserSchema');
const mongoose = require('mongoose');
const User = mongoose.model('User', UserSchema);

module.exports = User;

