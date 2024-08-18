const { FetchQuotes, updateQuote, InsertQuote } = require('./service');

exports.FetchQuotes = async (request) => {
    try {
        const { from ,limit, query } = request;
       return await FetchQuotes(from, limit, query);
    } catch (error) {
        throw error; 
    }
}

exports.updateQuote = async (meta, updateBody) => {
    try {
        const { quoteId } = meta;
        return await updateQuote(quoteId, updateBody);
    } catch (error) {
        throw error;
    }
};

exports.postQuote = async (request) => {
    try {
        return await InsertQuote(request);
    } catch (error) {
        throw error; 
    }
}