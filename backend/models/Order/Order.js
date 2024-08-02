const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const QuoteSchema = new Schema({
   userId: { type: String },
   quotePrice: { type: Number },
 }, { _id: false });

const OrderSchema = new Schema({
   shipmentName: String,
   pickupPlace: String,
   dropPlace: String,
   distanceInKm: Number,
   quotedPrice: Number,
   status: String,
   quotes: [QuoteSchema]
})

const orderSchema = mongoose.model('order', OrderSchema);

module.exports = orderSchema;