
var express = require('express');
var moviesModels = require('../models/moviesModels')
var pedidosModels = require('../models/pedidosModels');
var UserModels = require('../models/UserModels');
var router = express.Router();
const auth = require('../middlewares/auth')

//Get pedidos

router.post('/pedido', auth, async function(req, res, next) {

    const {idUser, idMovie} = req.body;
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
    fechaDevolucion.setDate(fechaDevolucion.getDate()+2);
  

    // Guardo los datos

    const pedido = await pedidosModels.create({idUser: idUser, idMovie: idMovie, fechaEntrega: fechaEntrega, fechaDevolucion: fechaDevolucion})
    
    // Respondo ok o ko

    if ( pedido === null) {return res.status(500).json({message: 'Internal error. Please, contact with the administrator'});}
    res.json({message: 'pedido completado, puedes verla hasta: ' + fechaDevolucion}).status(204);
    } catch (error) {
      response.status(500).json({message: "salio mal."})
    } 
});
     // fecha de entrega y evolucion
 
  
  module.exports = router;