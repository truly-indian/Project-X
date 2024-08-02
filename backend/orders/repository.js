const { FetchPaginated, FetchById, UpdateOne } = require('../repository/index');
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

exports.UpdateOne = async (_id, updateQuery) => {
    try {
        return await UpdateOne(Order, _id, updateQuery);
    } catch (error) {
        throw error; 
    }
}