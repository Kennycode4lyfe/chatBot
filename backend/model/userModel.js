
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const moment = require('moment');

let currentDate = moment().format("MMM Do YY");
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  created_at: Date,
  username: String,
  password: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;