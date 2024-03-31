const mongoose = require('mongoose');

// Define Mongoose Schema
const UserSchema = new mongoose.Schema({
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
    date: {
        type: String,
        default: Date.now
    },

});

// Compiling our schema into a Model and will create a collection named "users"
const User = mongoose.model('user', UserSchema);
module.exports = { User }

