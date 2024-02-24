const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    url:{
        required: true,
        type: String
    },
    id: {
        required: true,
        type: String
    },
    shorturl:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("URL", UrlSchema)