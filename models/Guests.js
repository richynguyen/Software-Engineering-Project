// Everything in Mongoose starts with a schema. Each schema maps to a
// MongoDB Collection and defines the shape of the documents w/in that collecion
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create our Guest Schema
const GuestSchema = new Schema({
  guest_date: {
    type: Date,
    default: Date.now
  },
  shippingAddress: {
    type: String,
    default: ''
  }
})

// To use our schema we convert it into a model we can work with (name of the model, schema to be used)
module.exports = Guest = mongoose.model('guest', GuestSchema);