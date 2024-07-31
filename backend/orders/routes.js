const app = require('express').Router();
const responseHandler = require('../utils/responseHandler');
const { FetchOrders } = require('./handler');

app.get('/', async (req, res) => {
    try {
        const resp =  await FetchOrders();
        responseHandler.successResponse(res, {
            statusCode: 200,
            data: resp,
            message: 'Success'
        });
    } catch (error) {
        console.log('error while fetching orders: ', error);
        responseHandler.errorResponse(res, {
            statusCode: error?.statusCode || 500,
            data: error?.data || error,
            message: 'Failed'
        });
    }
});

module.exports = app; 