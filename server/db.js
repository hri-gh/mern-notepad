// getting-started.js
const mongoose = require('mongoose');

connectToMongo().catch(err => console.log(err));

async function connectToMongo() {
    await mongoose.connect('mongodb://127.0.0.1:27017/notepad');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function () {
    console.log("Connected to Mongo successfully")
})

// Define Mongoose Schema
// const contactSchema = new mongoose.Schema({
//     name: String,
//     phone: String,
//     email: String,
//     message: String,
// });

// // Compiling our schema into a Model and will create a collection named "contacts"
// const contact = mongoose.model('contact', contactSchema);

module.exports = { connectToMongo }
