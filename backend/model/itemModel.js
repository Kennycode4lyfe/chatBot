const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const moment = require("moment");

let currentDate = moment().format("MMM Do YY");
const ObjectId = Schema.ObjectId;

const ItemSchema = new Schema({
  id: ObjectId,
  created_at: Date,
  name: String,
  price: Number,
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
