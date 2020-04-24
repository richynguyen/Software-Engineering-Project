// Everything in Mongoose starts with a schema. Each schema maps to a MongoDB collection
// and defines the shape of the documents within that collection

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
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
// To use our schema we convert it into a model we can work with (name of the model, schema to be used)
module.exports = Item = mongoose.model('item', ItemSchema);