const { SignIn, SignUp } = require('./service');

exports.SignIn = async (request) => {
    try {
        return await SignIn(request);
    } catch (error) {
        console.log('[service]: error while login: ', error);
        throw error;
    }
};

exports.SignUp = async (request) => {
    try {
        return await SignUp(request);
    } catch (error) {
        console.log('[service]: error while registering user: ', error);
        throw error;
    }
};