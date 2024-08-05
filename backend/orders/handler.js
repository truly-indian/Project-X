const { FetchOrders, FetchOrderById, UpdateOne } = require('./service');

exports.FetchOrders = async (params, body) => {
    try {
        return await FetchOrders(params, body);
    } catch (error) {
        throw error;
    }
}

exports.FetchOrderById = async (params) => {
    try {
        return await FetchOrderById(params);
    } catch (error) {
        throw error;
    }
}

exports.UpdateOne = async (request) => {
    try {
        const orderId = request.params['_id'];
        const updateBody = request.body;
        const user = request.user;
        return await UpdateOne(orderId, updateBody, user);
    } catch (error) {
        throw error;
    }
}