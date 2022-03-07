
var express = require('express');
var router = express.Router();
var pedidosModels = require('../models/pedidosModels');
var UserModels = require('../models/UserModels');
const axios = require('axios');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

//Get pedidos

router.post('/', auth, async function(req, res, next) {

    const {idMovie, calidad, fecha} = req.body;
    const idUser = req.user._id;
    try{
      const movie = await axios.get(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=cea68b520beecac6718820e4ac576c3a`);
      let resultMovie = (movie.data !== null) ? movie.data: {};
      const user = await UserModels.findById(idUser);
      let resultUser = (user !== null) ? user: {};
      if (Object.keys(resultUser).length === 0 || Object.keys(resultMovie).length === 0){
        return response.status(400).json({});
      }
    let fechaEntrega = new Date();
    let fechaDevolucion = new Date(fechaEntrega);   
    fechaDevolucion.setDate(fechaDevolucion.getDate()+ fecha);
  
    // Guardo los datos

    const pedido = await pedidosModels.create({idUser: idUser, idMovie: idMovie, calidad: calidad, fechaEntrega: fechaEntrega, fechaDevolucion: fechaDevolucion})
    
    // Respondo ok o ko

    if ( pedido === null) {return res.status(500).json({message: 'Internal error. Please, contact with the administrator'});}
    res.json({message: 'pedido completado, puedes verla hasta: ' + fechaDevolucion}).status(204);
    } catch (error) {
      response.status(500).json({message: "salio mal."})
    } 
});
     // fecha de entrega y evolucion
     router.get('/user', auth, async (req, res, next) => {
      const pedidos = await pedidosModels.find({ idUser: req.user._id});
      let resultPedidos = (pedidos !== null) ? pedidos: {};
      res.status(200).json(resultPedidos);
  });

  router.get('/', [auth, admin], async (req, res, next) => {
    const pedidos = await pedidosModels.find();
    let resultPedidos = (pedidos !== null) ? pedidos: {};
    res.status(200).json(resultPedidos);
});
  
  module.exports = router;