


var express = require('express');
var router = express.Router();
const axios = require('axios');
const auth = require('../middlewares/auth');
// const morgan = require('morgan');
// const app = express();

//Add datos de prueba


//ENDPOINTS CRUD-------------------------------------------------------------------------------
//Metodo GET - READ ALL
/* router.get('/', (req, res) => {
    
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES').then(response => {
        // console.log(res);

        const peliculas = response.data.results;
       res.json(peliculas);
         //return peliculas
      /*   peliculas.forEach(pelicula => {
            console.log(pelicula)
        });  
    });
 */

router.get('/', auth, async function(req, res) {
   const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES'); 
   res.json(response.data.results);
});

//Metodo GET - READ por ID
router.get('/id/:id', auth, async function(req, res) {
    const idMovie = req.params.id;
    const response = await axios.get('https://api.themoviedb.org/3/movie/${idMovie}?api_key=cea68b520beecac6718820e4ac576c3a');
    res.json(response.data);
});


// busqueda por titulo

router.get('/titulo/:title', auth, async function(req, res){
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES}`);
    movie = response.data.results;
    moviesList = films.filter((movie) =>
        film.title.toLowerCase().indexOf(req.params.title.toLowerCase()) !== -1);
    res.json(moviesList);
});

// por genero
router.get('/genero/:genre', auth, async function(req, res){
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES}`);
    movie = response.data.results;
    moviesList = films.filter((movie) =>
        film.genre.toLowerCase().indexOf(req.params.genre.toLowerCase()) !== -1);
    res.json(moviesList);
});
 
// por actores 

router.get('/actores/:actors', auth, async function(req, res){
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES}`);
    movie = response.data.results;
    moviesList = films.filter((movie) =>
        film.actors.toLowerCase().indexOf(req.params.actors.toLowerCase()) !== -1);
    res.json(moviesList);
});


module.exports = router;

