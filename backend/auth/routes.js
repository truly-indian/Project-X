const router = require('express').Router()
const { SignIn, SignUp, UpdateUserProfile } = require('./handler');
const responseHandler = require('../utils/responseHandler');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('../models/User/User');

router.use(cookieParser());

router.post('/sign_up', async (req, res) => {
    try {
        const resp = await SignUp(req.body);
        responseHandler.successResponse(res, {
            statusCode: 200,
            data: resp,
            message: 'Success'
        });
    } catch (error) {
        console.log('error while signup: ', error);
        responseHandler.errorResponse(res, {
            statusCode: error?.statusCode || 500,
            data: error?.data || error,
            message: 'Failed'
        });
    }
});

router.post('/sign_in', async (req,res) => {
    try {
        const body = req.body;
        const resp = await SignIn(body);
        const token = jwt.sign({email: resp.email, _id: resp._id}, "secret_key", {expiresIn: '1h'} )
        responseHandler.successResponse(res, {
            statusCode: 200,
            data: {resp, token},
            message: 'Success'
        });
    } catch (error) {
        console.log('error while login: ', error);
        responseHandler.errorResponse(res, {
            statusCode: error?.statusCode || 500,
            data: error?.data || error,
            message: 'Failed'
        });
    }
});

router.post('/signout', async(req, res) => {
    try {
        
    } catch (error) {
        console.log('error while login: ', error);
        responseHandler.errorResponse(res, {
            statusCode: error?.statusCode || 500,
            data: error?.data || error,
            message: 'Failed'
        });
    }
});


router.put('/user/update', async (req, res) => {
    try {
        const user = req.headers['user-token'];
        const userId = jwt.decode(user)._id;
        const body = req.body;
        const meta = {
            userId,
        };
        const resp = await UpdateUserProfile(meta, body);
        responseHandler.successResponse(res, {
            statusCode: 200,
            data: resp,
            message: 'Success'
        });
    } catch (error) {
        console.log('error while updating user details: ', error);
        responseHandler.errorResponse(res, {
            statusCode: error?.statusCode || 500,
            data: error?.data || error,
            message: 'Failed'
        });
    }
});



module.exports = router;