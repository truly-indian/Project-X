const app = require('express').Router();
const responseHandler = require('../utils/responseHandler');
const { FetchOrders, FetchOrderById } = require('./handler');

app.get('/', async (req, res) => {
    try {
        const params = req.query;
        console.log('params: ', params);
        const resp =  await FetchOrders(params);
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

app.get('/:_id', async (req, res) => {
    try {
        const params = req.params;
        const resp =  await FetchOrderById(params);
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