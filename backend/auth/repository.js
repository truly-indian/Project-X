exports.Save = async (model) => {
    try {
        const resp = await model.save();
        return resp;
    } catch (error) {
        throw error;
    }
};


exports.Fetch = async (model, query) => {
    try {
        const resp = await model.findOne(query);
        return resp;
    } catch (error) {
        throw error;
    }
};

exports.Update = async (model, findQuery, query) => {
    try {
        return await model.findOneAndUpdate(findQuery, query, {new: true, upsert: false});
    } catch (error) {
        throw error; 
    }
}