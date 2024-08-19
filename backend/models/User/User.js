const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserDetailsSchema = new Schema({
    phoneNumbers: [Number],
    address: String,
    adhaar: Number,
    vehicleRc: String,
    vehicleInsurance: String,
    driverLicense: String,
});

const UserSchema = new Schema({
    name: String,
    googleId: String,
    email:String,
    thumbnail: String,
    password: String,
    userDetails: UserDetailsSchema
})

const User = mongoose.model('users', UserSchema);

module.exports = User;