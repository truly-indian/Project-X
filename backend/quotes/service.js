const { 
    FetchQuoteByUserIdAndOrderId, InsertQuote, FetchByIdAndUpdate, FetchQuotes,
    UpdateQuote, FetchOrderById
} = require('./repository');

exports.FetchQuoteByUserIdAndOrderId = async (userId, orderId) => {
    try {
       return await FetchQuoteByUserIdAndOrderId(userId, orderId);
    } catch (error) {
        console.log('error while fethcing quote by user and orderId: ', error);
        throw error;
    }
};

exports.InsertQuote = async (quote) => {
    try {
        return await InsertQuote(quote)
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

exports.updateQuote = async (quoteId, updateBody) => {
    try {
        const quote = await UpdateQuote(quoteId, updateBody);
        return quote;
    } catch (error) {
        throw error;
    }
}

