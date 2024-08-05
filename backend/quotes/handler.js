const { FetchQuotes } = require('./service');

exports.FetchQuotes = async (request) => {
    try {
        const { from ,limit, query } = request;
       return await FetchQuotes(from, limit, query);
    } catch (error) {
        throw error; 
    }
}