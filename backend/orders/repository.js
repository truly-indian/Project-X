const { FetchPaginated, FetchById, UpdateOne, FindByIdAndUpdate } = require('../repository/index');
const Order = require('../models/Order/Order');
const { GetObjectIdFromString } = require('../utils/utils');

exports.FetchOrders = async (from, limit, query) => {
    try {
        const resp = await FetchPaginated(Order, {from, limit, query});
        return {orders: resp.documents, total: resp.total};
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

exports.FindOneAndUpdateOrderByOrderId = async (orderId, order) => {
    try {
        const findQuery = {
            '_id': GetObjectIdFromString(orderId)
        }
        const query = order;
        return await FindByIdAndUpdate(Order, findQuery, query)
    } catch (error) {
        throw error; 
    }
}