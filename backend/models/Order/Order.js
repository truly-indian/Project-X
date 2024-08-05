const mongoose = require('mongoose');
const { QuoteSchema } = require('../Quote/Quote');
const Schema = mongoose.Schema; 

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