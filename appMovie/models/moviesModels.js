import fetch from 'node-fetch';

let Films = fetch('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES')
.then(response => response.json())
.then(data => console.log(data));


// pagina de api movies   const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&page=${numPaginaBase}`);



// todas las pelis
Films.allMovies = ()=>{
    return Films;
};

//devolver las pelis por id


Films.movieID = (id)=>{
    return Films[id-1];
};


//por titulo

Films.getTitles = (paramtitle)=>{
    return Films.filter((films)=> 
    films.title.toLoweCase().indexOf(paramtitle.toLoweCase()) !== -1);
};

//por genero

Films.getGenre = (paramgenre)=>{
    return Films.filter((films)=> 
    films.genre.toLoweCase().indexOf(paramgenre.toLoweCase()) !== -1);
};

// por actores
Films.getActors = (paramactors)=>{
    return Films.filter((films)=> 
    films.actors.toLoweCase().indexOf(paramactors.toLoweCase()) !== -1);
};



module.exports = Films;




