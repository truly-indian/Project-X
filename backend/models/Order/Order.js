const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const OrderSchema = new Schema({
   shipmentName: String,
   pickupPlace: String,
   dropPlace: String,
   distanceInKm: String,
})

const orderSchema = mongoose.model('order', OrderSchema);

module.exports = orderSchema;