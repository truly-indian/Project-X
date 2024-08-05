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
        const userId = user._id;
        const price = updateBody.quotePrice;
        let quote = await FetchByIdAndUpdate(userId, orderId, updateBody);
        if (!quote) {
            // create quote
            quote = await InsertQuote(userId, orderId, price);
        }
        let order = await FetchOrderById(orderId);
        const quoteUpdate = {
            'userId': quote.userId,
            '_id': quote._id.toString(),
            'quotePrice': quote.quotePrice
        }
        const quotes = order?.quotes || [];
        if (quotes.length === 0) {
            quotes.push(quoteUpdate);
        }
        const updatedQuotes = quotes.map((quote) => {
            if (quote.userId.toString() === userId) {
                quote.quotePrice = updateBody.quotePrice;
            }
            return quote;
        });
        const minQuote = updatedQuotes.reduce((minEl, current) => {
            return current.quotePrice < minEl.quotePrice ? current : minEl;
        }, { quotePrice: Infinity });
        order.quotes = updatedQuotes;
        order.quotedPrice = minQuote.quotePrice;
        return await FindOneAndUpdateOrderByOrderId(orderId, order);
    } catch (error) {
        console.log('error while updating order: ', error);
        throw error;
    }
}