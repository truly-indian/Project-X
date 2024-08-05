const {Quote} = require('../models/Quote/Quote');
const { Fetch, Insert, FindByIdAndUpdate, FetchPaginated } = require('../repository/index');
const {GetObjectIdFromString} = require('../utils/utils');

exports.FetchQuoteByUserIdAndOrderId = async (userId, orderId) => {
    try {
        const userIdObjectId = GetObjectIdFromString(userId);
        const orderIdObjectId = GetObjectIdFromString(orderId);
        const query = {'orderId': orderIdObjectId, "userId": userIdObjectId};
        return await Fetch(Quote, query);
    } catch (error) {
        throw error; 
    }
};

exports.FetchByIdAndUpdate = async (userId, orderId, updateBody) => {
    try {
        const query = {
            $set: {
                'quotePrice': updateBody.quotePrice
            }
        }

        const findQuery = {
            'orderId': GetObjectIdFromString(orderId),
            'userId': GetObjectIdFromString(userId)
        }
        return await FindByIdAndUpdate(Quote, findQuery, query);
    } catch (error) {
        throw error; 
    }
}

exports.InsertQuote = async (userId, orderId, price) => {
    try {
        const newQuote = new Quote({
            userId: GetObjectIdFromString(userId),
            orderId: GetObjectIdFromString(orderId),
            quotePrice: price
        });
        return await Insert(newQuote);
    } catch (error) {
        throw error; 
    }
}

exports.FetchQuotes = async (from, limit = 0, query = {}) => {
    try {
      const resp =  await FetchPaginated(Quote, {from, limit, query});
      return {quotes: resp.documents, total: resp.total}
    } catch (error) {
        throw error; 
    }
}