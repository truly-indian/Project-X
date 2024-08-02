const app = require('express').Router();
const responseHandler = require('../utils/responseHandler');
const { FetchOrders, FetchOrderById, UpdateOne } = require('./handler');

app.get('/', async (req, res) => {
    try {
        const params = req.query;
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

app.patch('/:_id', async (req, res) => {
    try {
        const params = req.params;
        const body = req.body;
        const request = {
            params, 
            body
        }
        const resp =  await UpdateOne(request);
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