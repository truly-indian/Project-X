const app = require('express').Router();
const responseHandler = require('../utils/responseHandler');
const { FetchOrders, FetchOrderById, UpdateOne } = require('./handler');
const jwt = require('jsonwebtoken');

app.post('/', async (req, res) => {
    try {
        const params = req.query;
        const body = req.body;
        const resp =  await FetchOrders(params, body);
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

app.put('/:_id', async (req, res) => {
    try {
        const params = req.params;
        const body = req.body;
        const userToken = req.headers['user-token'];
        const user = jwt.decode(userToken);
        const meta = {
            userId: user._id, 
            orderId: params["_id"]
        };
        const resp =  await UpdateOne(meta, body);
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