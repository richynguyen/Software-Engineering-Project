// Everything in Mongoose starts with a schema. Each schema maps to a MongoDB collection
// and defines the shape of the documents within that collection

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  productID: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
// To use our schema we convert it into a model we can work with (name of the model, schema to be used)
module.exports = Product = mongoose.model('product', ProductSchema);