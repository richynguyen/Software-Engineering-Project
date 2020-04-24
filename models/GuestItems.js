// Everything in Mongoose starts with a schema. Each schema maps to a 
// MongoDB collection and defines the shape of the documents w/in that collection
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create our Guest Items Schema
const GuestItemsSchema = new Schema({
  name: {
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

// To use our schema we convert it into a model we can work with (name of the model, shcema to be used)
module.exports = GuestItem = mongoose.model('guestItems', GuestItemsSchema);