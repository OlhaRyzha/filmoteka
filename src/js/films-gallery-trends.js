'use strict'
import { ThemoviedbAPI } from "./api";
import { createFilmCards } from "./film-card";

const themoviedb = new ThemoviedbAPI();
const galleryEl = document.querySelector('.film-card__list')
const container = document.querySelector('#pagination');


themoviedb.fetchTrendMovies()
.then((data) => {

    data.results.forEach(film => {
        film.genreNames = film.genre_ids
        .map(filmID => 
                (themoviedb.genres).find(({ id }) => id === filmID)
            )
                .map(({ name }) => name)
    });

  galleryEl.insertAdjacentHTML("beforeend", createFilmCards(data.results))            
}).catch((err) => {
    console.log(err);
})

async function switchesPages(e) {
  if (e.target.tagName !== 'A'){
    return;
  }
  themoviedb.fetchTrendMovies()
 .then((data) => {
  themoviedb.page = 1;

  themoviedb.page = Number(e.target.textContent);
    data.results.map(film => {
    film.genreNames = film.genre_ids.map(genreId => {
        return themoviedb.genresObject[genreId] || 'Unknown genre';
    })
 })
    

  galleryEl.innerHTML = createFilmCards(data.results); 

}).catch((err) => {
    console.log(err);
})
}


container.addEventListener('click', switchesPages)

