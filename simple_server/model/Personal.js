const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Personal = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone_number: {
    type: Number
  },
  desc: {
    type: String
  }
},{
    collection: 'Personal'
});

module.exports = mongoose.model('Personal', Personal);