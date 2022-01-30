var express = require('express');
var User = require('../models/User');
var pedidos = require('../models/pedidosModels');
var router = express.Router();



router.post('/pedido', async (req, res, next) => {
    const email = req.body.email;
    const movieID = req.body.id;
    const fechaEntrega =  new Date();

     // fecha de entrega y evolucion

    let fechaDevolucion = new Date(fechaEntrega);   
    fechaDevolucion.setDate(fechaDevolucion.getDate()+2);
  
    // Valido los datos recibidos. Si son incorrectos, devuelvo ko
    // Valido que el correo no existe

    const userExists = await User.findOne({ email: email});
    if (userExists !== null) { return res.status(401).json({message: 'email incorrecto'}); }
    const userMovie = await pedidos.findOne({ email: email});
    if (userMovie !== 0) { return res.status(401).json({message: 'el usuario ya alquilo una pelicula'}); }

    // Guardo los datos

    const pedido = await pedidos.create({email: email, movieID: movieID, fechaEntrega: fechaEntrega, fechaDevolucion: fechaDevolucion})
    
    // Respondo ok o ko

    if ( pedido === null) return res.status(500).json({message: 'Internal error. Please, contact with the administrator'});
  
    res.json({message: 'pedido completado, puedes verla hasta: ' + fechaDevolucion}).status(204);
  });
  
  module.exports = router;