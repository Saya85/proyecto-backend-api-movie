const mongoose = require('mongoose');
const movieSchema = require('./schemas/movieSchema');
const moviesModels = mongoose.model('movies', movieSchema);


module.exports = moviesModels;

