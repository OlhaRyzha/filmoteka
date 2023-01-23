'use strict'
import { ThemoviedbAPI } from "./api";
import { createFilmCards } from "./film-card";

const themoviedb = new ThemoviedbAPI();
const galleryEl = document.querySelector('.film-card__list')
const container = document.querySelector('#pagination');


// themoviedb.fetchTrendMovies()
// .then((data) => {

//   data.results.map(film => {
//     film.genreNames = film.genre_ids.map(genreId => {
//       return themoviedb.genresObject[genreId] || 'Unknown genre';
//     });
//     });

//   galleryEl.insertAdjacentHTML("beforeend", createFilmCards(data.results))            
// }).catch((err) => {
//     console.log(err);
// })


