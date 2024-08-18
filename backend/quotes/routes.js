const router = require('express').Router();
const responseHandler = require('../utils/responseHandler');
const { FetchQuotes, updateQuote, postQuote } = require('./handler');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    try{
        const from = req.query['from'];
        const limit = req.query['limit'];
        const query = req.body;
        const request = {
            from, limit,
            query
        }
        const resp = await FetchQuotes(request);
        responseHandler.successResponse(res, {
            statusCode: 200,
            data: resp,
            message: 'success'
        });
    } catch (error) {
        console.log('error while fetching quotes: ', error);
        responseHandler.errorResponse(res, {
            statusCode: error?.statusCode || 500,
            data: error?.data || error,
            message: 'Failed'
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const quoteId = req.params["id"];
        const updateBody = req.body;
        const meta = {
            quoteId
        }
        const resp = await updateQuote(meta, updateBody);
        responseHandler.successResponse(res, {
            statusCode: 200,
            data: resp,
            message: 'success'
        });
    } catch (error) {
        console.log('error while fetching quotes: ', error);
        responseHandler.errorResponse(res, {
            statusCode: error?.statusCode || 500,
            data: error?.data || error,
            message: 'Failed'
        });
    }
});

router.post('/submit_quote', async (req, res) => {
    try {
        let reqBody = req.body; 
        const user = req.headers['user-token'];
        const userId = jwt.decode(user)._id;
        reqBody = {
            ...reqBody,
            "userId": userId
        }
        const resp = await postQuote(reqBody);
        responseHandler.successResponse(res, {
            statusCode: 200,
            data: resp,
            message: 'success'
        });
    } catch (error) {
        console.log('error while submitting quotes: ', error);
        responseHandler.errorResponse(res, {
            statusCode: error?.statusCode || 500,
            data: error?.data || error,
            message: 'Failed'
        }); 
    }
});


module.exports = router;