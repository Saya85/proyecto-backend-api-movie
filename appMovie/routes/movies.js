


const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middlewares/auth');

router.get('/', auth, async function(req, res) {
   const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a'); 
   res.json(response.data.results);
});

// busqueda por titulo

router.get('/titulo/:title', auth, async function(req, res){
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`);
    movies = response.data.results;
    console.log(movies + "movies enpoint");
    moviesList = movies.filter((film) =>
        film.title.toLowerCase().indexOf(req.params.title.toLowerCase()) !== -1);
    res.json(moviesList);
});

/* // por genero
router.get('/genero/:genres', auth, async function(req, res){
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`);
    movies = response.data.results;
    moviesList = movies.filter((film) =>
        film.genres.toLowerCase().indexOf(req.params.genres.toLowerCase()) !== -1);
    res.json(moviesList);
}); */

//Metodo GET - READ por ID
router.get('/id/:id', auth, async function(req, res) {
    const idFilm = req.params.id;
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${idFilm}?api_key=cea68b520beecac6718820e4ac576c3a`);
    res.json(response.data);
});
 
// por actores 

/* router.get('/actores/:actors', auth, async function(req, res){
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES}`);
    movies = response.data.results;
    moviesList = films.filter((film) =>
        film.actors.toLowerCase().indexOf(req.params.actors.toLowerCase()) !== -1);
    res.json(moviesList);
}); */


module.exports = router;

