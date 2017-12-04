let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bookSchema = new Schema({
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: false},
});

module.exports = mongoose.model('Book', bookSchema)