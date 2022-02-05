const PedidosSchema = require('./schemas/PedidoSchema');
const mongoose = require('mongoose');
const pedidosModels = mongoose.model('pedidos', PedidosSchema);

module.exports = pedidosModels;

