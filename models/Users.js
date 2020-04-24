// Everything in Mongoose starts with a schema. Each schema maps to a MongoDB collection
// and defines the shape of the documents within that collection

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    cityAddress: {
        type: String,
        required: true
    },
    stateAddress: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});
// To use our schema we convert it into a model we can work with (name of the model, schema to be used)
module.exports = User = mongoose.model('user', UserSchema);