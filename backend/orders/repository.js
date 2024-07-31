const { Fetch } = require('../repository/index');
const Order = require('../models/Order/Order');

exports.FetchOrders = async () => {
    try {
        return await Fetch(Order, {});
    } catch (error) {
        throw error;
    }
};