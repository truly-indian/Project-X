const { FetchQuoteByUserIdAndOrderId, InsertQuote, FetchByIdAndUpdate, FetchQuotes } = require('./repository');

exports.FetchQuoteByUserIdAndOrderId = async (userId, orderId) => {
    try {
       return await FetchQuoteByUserIdAndOrderId(userId, orderId);
    } catch (error) {
        console.log('error while fethcing quote by user and orderId: ', error);
        throw error;
    }
};

exports.InsertQuote = async (userId, orderId, quotePrice) => {
    try {
        return await InsertQuote(userId, orderId, quotePrice)
    } catch (error) {
        console.log('error while inserting quote', error);
        throw error;
    }
}

exports.FetchByIdAndUpdate = async (userId, orderId, updateBody) => {
    try {
        return await FetchByIdAndUpdate(userId, orderId, updateBody)
    } catch (error) {
        console.log('error while finding by id and updating quote', error);
        throw error;
    }
}

exports.FetchQuotes = async (from, limit=0, query) => {
    try {
        return await FetchQuotes(from, limit, query); 
    } catch (error) {
        console.log('erro while fetching quotes: ', error);
    }
}