const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass:{
        type:String,
        required: true,
    },
    phon: {
        type: String,
        required: true,
    },
    hasS: { 
        type: Boolean,
        default: false
    },
    profile: { 
        type: String,
        default: 'user'
    }
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;
