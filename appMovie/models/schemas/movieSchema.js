const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    contentRating: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    }
});

movieSchema.methods.toJSON = function () {
    const movie = this.toObject();
    return movie;
}

module.exports = movieSchema;