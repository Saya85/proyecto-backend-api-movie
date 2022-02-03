const PedidosSchema = require('./schemas/PedidoSchema');
const mongoose = require('mongoose');
const pedidosModels = mongoose.model('pedido', PedidosSchema);

module.exports = pedidosModels;

