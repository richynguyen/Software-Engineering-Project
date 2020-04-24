const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
  orderID: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Orders = mongoose.model('Orders', OrdersSchema);