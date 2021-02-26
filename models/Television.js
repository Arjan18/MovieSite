const mongoose = require('mongoose');

const televisionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    overview: {
        type: String,
        required: true
    },
    seasons: {
        type: Number,
        required: true
    },
    episodes: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    posterFile: {
        type: String,
        required: true
    },
    trailer: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    releaseYear: {
        type: String,
        required: true
    },
    network: {
        type: String,
        required: true
    },
});

const Show = mongoose.model("Show", televisionSchema);

module.exports = Show;