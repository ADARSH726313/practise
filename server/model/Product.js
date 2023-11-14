const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Productdb = mongoose.model('productdb', schema);

module.exports = Productdb;
