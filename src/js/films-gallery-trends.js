'use strict'
import { ThemoviedbAPI } from "./api";

const themoviedb = new ThemoviedbAPI();

themoviedb.fetchTrendMovies()
.then((data) => {
    console.log(themoviedb.genres);
    console.log(data.results);
        
}).catch((err) => {
    console.log(err);
})
    

function createMarkup (arr){
    return arr.map((el, id, arr) => {
        return `
        <div>
          <img src="${el.title}" alt="${el.title}">
          <strong>${el.title}</strong>
          <p>${el.title}</p>
          <p>${release_date}</p>
          <p>${el.vote_average}</p>
        </div>
        `
})
}

function makeGenre(arr) {
    
}


