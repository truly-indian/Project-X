const mongoose = require('mongoose');

exports.Fetch = async (model, query) => {
    try {
        return await model.find(query);
    } catch (error) {
        throw error;
    }
};

exports.FetchPaginated = async (model, query) => {
    try {
        console.log(query);
        const orders = await model
                    .find()
                    .skip(query.from)
                    .limit(query.limit)
                    .exec();

            const total = await model.countDocuments();
            return {orders, total}
    } catch (error) {
        throw error; 
    }
};

exports.FetchById = async (model, _id) => {
    try {
        return await model.findOne({'_id': new mongoose.Types.ObjectId(_id)})
    } catch (error) {
        throw error;
    }
}