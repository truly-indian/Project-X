const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    googleId: String,
    email:String,
    thumbnail: String,
    password: String
})

const User = mongoose.model('users', UserSchema);

module.exports = User;