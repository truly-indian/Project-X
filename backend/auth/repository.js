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