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

exports.UpdateOne = async (meta, requestBody) => {
    try {
        const { orderId, userId } = meta; 
        return await UpdateOne(orderId, requestBody, userId);
    } catch (error) {
        throw error;
    }
}