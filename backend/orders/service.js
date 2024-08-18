const { FetchOrders, FetchOrderById, FindOneAndUpdateOrderByOrderId } = require('./repository');
const { FetchByIdAndUpdate, InsertQuote } = require('../quotes/service');

exports.FetchOrders = async (params, query) => {
    try {
        const from = params['from'];
        const limit = params['limit'];
        const orders = await FetchOrders(from, limit, query);
        return orders;
    } catch (error) {
        console.log('error while fetching orders: ', error);
        throw error;
    }
};

exports.FetchOrderById = async (params) => {
    try {
        const _id = params['_id'];
        const orders = await FetchOrderById(_id);
        return orders;
    } catch (error) {
        console.log('error while fetching order by id: ', error);
        throw error;
    }
};

exports.UpdateOne = async (orderId, updateBody, user) => {
    try {
        return await FindOneAndUpdateOrderByOrderId(orderId, updateBody);
    } catch (error) {
        console.log('error while updating order: ', error);
        throw error;
    }
}