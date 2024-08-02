const { FetchOrders, FetchOrderById, UpdateOne } = require('./repository');

exports.FetchOrders = async (params) => {
    try {
        const from = params['from'];
        const limit = params['limit'];
        const orders = await FetchOrders(from, limit);
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

exports.UpdateOne = async (_id, updateBody) => {
    try {
        const order = await UpdateOne(_id, updateBody); 
        const quotes = order?.quotes || []; 
        const quotePrice = quotes.reduce((min, current) => {
            return current.quotePrice < min ? current.quotePrice : min;
        }, Infinity);
        const resp = await UpdateOne(_id, {'quotedPrice': quotePrice});
        return resp;
    } catch (error) {
        console.log('error while updating order: ', error);
        throw error;
    }
}