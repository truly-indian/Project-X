const router = require('express').Router();
const responseHandler = require('../utils/responseHandler');
const { FetchQuotes } = require('./handler');

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
        responseHandler.errorResponse(res, {
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

module.exports = router;