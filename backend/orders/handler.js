const { FetchOrders } = require('./service');

exports.FetchOrders = async () => {
    try {
        return await FetchOrders();
    } catch (error) {
        throw error;
    }
}