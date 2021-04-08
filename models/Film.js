const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    synopsis: {
        type: String,
        required: true
    },
    runTime: {
        type: Number,
        required: true
    },
    releaseDate: {
        type: String,
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
    director: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    Reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    },
    box_office: {
        type: String,
    },
});

const Film = mongoose.model("Film", filmSchema);

module.exports = Film;