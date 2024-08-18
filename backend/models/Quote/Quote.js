const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const QuoteSchema = new Schema({
   userId: { type: mongoose.Types.ObjectId },
   orderId: {type: mongoose.Types.ObjectId},
   quotePrice: { type: Number },
   status: String,
   statuses: [String],
   createdAt: Number,
   updatedAt: Number
 });

const Quote = mongoose.model('quote', QuoteSchema);

module.exports = {
  Quote,
  QuoteSchema
};