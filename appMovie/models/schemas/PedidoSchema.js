const mongoose = require('mongoose');
// const User = require('../User');
const PedidosSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        },
    movieID: {
        type: String,
        required: true,
    },
    fechaEntrega: {
        type: Date,
        required: true
    },
    fechaDevolucion: {
        type: Date,
        required: true
    },
});






module.exports = PedidosSchema;
