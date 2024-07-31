const User = require('../models/User/User');
const { Save, Fetch } = require('./repository')

exports.SignIn = async (request) => {
    try {
        const { email, password } = request;
        const user = await Fetch(User, {email, password});
        return user;
    } catch (error) {
        throw error;
    }
}

exports.SignUp = async (request) => {
    try {
        const { email, password } = request;
        const user =  await Fetch(User, { 'email': email });
        if (user) throw { error: 'user already exists', statusCode: 409 }
        let newUser = new User({ email, password });
        await Save(newUser);
    } catch (error) {
        throw error;
    }
};