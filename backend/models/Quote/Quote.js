const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const QuoteSchema = new Schema({
   userId: { type: mongoose.Types.ObjectId },
   orderId: {type: mongoose.Types.ObjectId},
   quotePrice: { type: Number },
 });

const Quote = mongoose.model('quote', QuoteSchema);

module.exports = {
  Quote,
  QuoteSchema
};