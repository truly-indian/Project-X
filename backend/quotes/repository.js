const {Quote} = require('../models/Quote/Quote');
const  Order  = require('../models/Order/Order');
const { Fetch, Insert, FindByIdAndUpdate, FetchPaginated, FindByIdAndReplace, FetchById } = require('../repository/index');
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

exports.InsertQuote = async (quote) => {
    try {
        const newQuote = new Quote(quote);
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

exports.UpdateQuote = async (quoteId, updateBody) => {
    try {
        const query = {
            $set: {
                ...updateBody
            }
        }

        const findQuery = {
            '_id': GetObjectIdFromString(quoteId)
        }
        return await FindByIdAndUpdate(Quote, findQuery, query)
    } catch (error) {
        throw error;
    }
}

exports.FetchOrderById = async (orderId) => {
    try {
        return await FetchById(Order, orderId);
    } catch (error) {
        throw error;
    }
};