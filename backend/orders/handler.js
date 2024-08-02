const { FetchOrders, FetchOrderById } = require('./service');

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