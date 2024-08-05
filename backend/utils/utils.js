const mongoose = require('mongoose');

exports.GetObjectIdFromString = (str) => {
    return new mongoose.Types.ObjectId(str);
}