'use strict';

import { ThemoviedbAPI } from './api';
import { createFilmCards } from './film-card';

const themoviedbAPI = new ThemoviedbAPI();

const galleryEl = document.querySelector('film-card__list');

displayMovies(); // Event інпуту !!!

async function displayMovies() {
  try {
    const genres = await themoviedbAPI.fetchGenresMovieList();

    themoviedbAPI.query = 'avatar'; // Value з інпуту !!!

    const filmsByQuery = await themoviedbAPI.fetchFilmByQuery();
    const { results } = filmsByQuery;

    results.forEach(film => {
      film.genreNames = film.genre_ids
        .map(filmID => genres.find(({ id }) => id === filmID))
        .map(({ name }) => name);
    });

    galleryEl.innerHTML = createFilmCards(results);
  } catch (err) {
    console.log(err);
  }
}

// galleryEl.addEventListener('click', onFilmCardClick);

// function onFilmCardClick(event) {
//   if (event.target.nodeName !== 'LI') {
//     return;
//   }
// }
