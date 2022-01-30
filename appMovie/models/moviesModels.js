axios = require('axios')

let Films = [
    {"id":1,"title":"Accident","genre":"Crime|Drama","actors":"Leonardo de Caprio"},
    {"id":2,"title":"Easy Money (Snabba Cash)","genre":"Action|Thriller","actors":"Richar Gere"},
    {"id":3,"title":"I Want Candy","genre":"Comedy","actors":"Richar Gere"},
    {"id":4,"title":"Battle Hymn","genre":"Drama","actors":"Richar Gere"},
    {"id":5,"title":"King and I, The","genre":"Animation|Children","actors":"Richar Gere"},
    {"id":6,"title":"Green Slime, The","genre":"Drama|Horror|Sci-Fi","actors":"Morgan Freman"},
    {"id":7,"title":"Mating Season, The","genre":"Comedy","actors":"Leonardo de Caprio"},
    {"id":8,"title":"White Frog","genre":"Drama","actors":"Richar Gere"},
    {"id":9,"title":"Front Page Woman","genre":"Comedy|Romance","actors":"Angelina Jolie"},
    {"id":10,"title":"Lone Wolf and Cub: Baby Cart to Hades (Kozure Ôkami: Shinikazeni mukau ubaguruma)","genre":"Action|Drama","actors":"Angelina Jolie"}
]


//let Films = axios.get('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES')

 //let getFilms = () => {
   // axios.get('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES').then(res => {
        // console.log(res);

       // const peliculas = res.data.results;
        //return peliculas
      //
    //});
//}
 


// pagina de api movies   const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&page=${numPaginaBase}`);



// todas las pelis
Films.allMovies = ()=>{
    return Films;
    console.log(Films)
};

//devolver las pelis por id

 
Films.movieID = (id)=>{
    return Films[id-1];
};


//por titulo

Films.getTitles = (paramtitle)=>{
    return Films.filter((films)=> 
    films.title.toLowerCase().indexOf(paramtitle.toLowerCase()) !== -1);
};

//por genero

Films.getGenre = (paramgenre)=>{
    return Films.filter((films)=> 
    films.genre.toLowerCase().indexOf(paramgenre.toLowerCase()) !== -1);
};

// por actores
Films.getActors = (paramactors)=>{
    return Films.filter((films)=> 
    films.actors.toLowerCase().indexOf(paramactors.toLowerCase()) !== -1);
};


 
module.exports = Films;




