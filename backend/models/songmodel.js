const mongoose = require('mongoose')

const Schema = mongoose.Schema

const songSchema = new Schema({
    song:{
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Song', songSchema)