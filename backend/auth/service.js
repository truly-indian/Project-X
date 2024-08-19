const User = require('../models/User/User');
const { Save, Fetch, Update } = require('./repository')
const bcrypt = require('bcrypt');
const {GetObjectIdFromString} = require('../utils/utils');
const saltRounds = 10;

exports.SignIn = async (request) => {
    try {
        const { email, password } = request;
        const user = await Fetch(User, {email});
        const storedPassword = user?.password || ''; 
        const passwordMatched = await bcrypt.compare(password, storedPassword);
        if (!passwordMatched) throw {error: 'password did not match', status: '401'}
        return user;
    } catch (error) {
        console.log('error while signing user in: ', {...error})
        throw error;
    }
}

exports.SignUp = async (request) => {
    try {
        const { email, password } = request;
        const user =  await Fetch(User, { 'email': email });
        if (user) throw { error: 'user already exists', statusCode: 409 }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        let newUser = new User({ email, password: hashedPassword });
        await Save(newUser);
    } catch (error) {
        throw error;
    }
};

exports.UpdateUserProfile = async (userId, userProfileUpdate) => {
    try {
        const query = {
            $set: {
                'userDetails': userProfileUpdate
            }
        }
        
        const findQuery = {
            '_id': GetObjectIdFromString(userId)
        }
        await Update(User, findQuery, query);
        return {message: "success updated user successfully!!"}
    } catch (error) {
        throw error; 
    }
}