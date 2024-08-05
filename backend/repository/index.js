const mongoose = require('mongoose');

exports.Fetch = async (model, query) => {
    try {
        return await model.find(query);
    } catch (error) {
        throw error;
    }
};

exports.FetchPaginated = async (model, query = {from: 0, limit: 0, query: {}}) => {
    try {
        const documents = await model
                    .find(query.query)
                    .skip(query.from)
                    .limit(query.limit)
                    .exec();
            const total = await model.countDocuments();
            return {documents, total}
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

exports.UpdateOne = async(model, _id, query) => {
    try {
        const resp =  await model.findByIdAndUpdate(
            _id,
            { $set: query },
            { new: true, runValidators: true } 
        );
        return resp;
    } catch (error) {
        console.log('error: ', error)
        throw error;
    }
}

exports.Insert = async (model) => {
    try {
        return await model.save();
    } catch (error) {
        throw error; 
    }
}

exports.FindByIdAndUpdate = async (model, findQuery, query) => {
    try {
        return await model.findOneAndUpdate(findQuery, query,{ new: true, upsert: false })
    } catch (error) {
        console.log('error: ',error);
        throw error;
    }
};