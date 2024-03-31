const mongoose = require('mongoose');
// const {connectToMongo} = require('./db');

// Define Mongoose Schema
const NotesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,

    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: String,
        default: Date.now
    },

});

// Compiling our schema into a Model and will create a collection named "notes"
const Note = mongoose.model('note', NotesSchema);

module.exports = { Note }

