const mongoose = require('mongoose');
// const User = require('../User');
const PedidosSchema = new mongoose.Schema({
    idUser: {
        type: String,
        required: true,
        },
    idMovie: {
        type: String,
        required: true,
    },
    fechaEntrega: {
        type: String,
        required: true
    },
    fechaDevolucion: {
        type: String,
        required: true
    },
});
PedidosSchema.methods.toJSON = function () {
    const pedido = this.toObject();
    delete pedido.__v;
    return pedido;
  }

module.exports = PedidosSchema;
