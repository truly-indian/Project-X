const { Fetch, FetchPaginated, FetchById } = require('../repository/index');
const Order = require('../models/Order/Order');

exports.FetchOrders = async (from, limit) => {
    try {
        return await FetchPaginated(Order, {from, limit});
    } catch (error) {
        throw error;
    }
};

exports.FetchOrderById = async (orderId) => {
    try {
        return await FetchById(Order, orderId);
    } catch (error) {
        throw error;
    }
};