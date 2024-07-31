exports.Fetch = async (model, query) => {
    try {
        return await model.find(query);
    } catch (error) {
        throw error;
    }
};