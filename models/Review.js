const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    written_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comment: {
        type: String,
        required: true
    },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;