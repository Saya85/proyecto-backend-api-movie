const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const User = require('../User');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
        },
    email: {
        type: String,
        required: true,
        unique: true,
        },
    password: {
        type: String,
        required: true,
        minlength: 6
        },
    role: {
        type: String,
        default: 'user',
        required: true
    },
    tokens: [{
        token: {
          type: String,
          required: true
        }
    }],
});

UserSchema.methods.simpleUser = function () {
    const user = this.toObject();
    delete user.password;
    delete user.tokens;
    delete user.role;
    delete user.__v;
    delete user._id;
    return user
}

UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.tokens;
    delete user.role;
    delete user.__v;
    return user ;
  }

UserSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
       user.password = await bcrypt.hash(user.password, 8)
    }
    next()
 })

UserSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id, name: user.name, role: user.role, email: user.email}, process.env.JWT_SECRET)
    console.log(typeof user.tokens, user.tokens)
    user.tokens = user.tokens.concat({token: token})
    await user.save()
    return token
 }

UserSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
       throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
       throw new Error({ error: 'Invalid login credentials' })
    }
    return user
 }

const User = mongoose.model ('User', UserSchema);
module.exports = UserSchema;
