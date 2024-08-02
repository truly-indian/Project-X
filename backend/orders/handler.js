const { FetchOrders, FetchOrderById, UpdateOne } = require('./service');

exports.FetchOrders = async (params) => {
    try {
        return await FetchOrders(params);
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
        const _id = request.params['_id'];
        const updateBody = request.body;
        return await UpdateOne(_id, updateBody);
    } catch (error) {
        throw error;
    }
}