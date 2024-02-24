const mongoose = require('mongoose');

const SequenceSchema = new mongoose.Schema({
    _id :{
        type: String
    },
    sequence_val : {
        type: Number
    },
    lastTimeStamp:{
        type: Number
    }
})

module.exports = mongoose.model('Sequence', SequenceSchema)