const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const moment = require('moment');

let currentDate = moment().format("MMM Do YY");
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
  id: ObjectId,
  created_at:Date,
  total_price: Number,
  items: [{
    name: String,
    price: Number,
    quantity: Number,
  }]
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;