'use strict';

import localStorageService from './localstorage.js';
import { createFilmCards } from './film-card';
import { ThemoviedbAPI } from './api.js';

const themovieApi = new ThemoviedbAPI(); 

const galleryEl = document.querySelector('.film-card__list');
const watchedBtnEl = document.querySelector('.js-watched');
const queueBtnEl = document.querySelector('.js-queue');

watchedBtnEl.addEventListener('click', onWatchedBtnClick);
queueBtnEl.addEventListener('click', onQueueBtnClick);


async function onWatchedBtnClick(event) {
//   const watchedMovies = localStorageService.load('watched');
  console.log(themovieApi.watchArray);
  if (themovieApi.watchArray.length === 0) {
    return;
    }
    
  const arrayOfPromises = themovieApi.watchArray.map(async userId => {
    const response = await themovieApi.fetchFilmInfo(userId);
      return response;
  });
    
  const films = await Promise.all(arrayOfPromises);
    console.log(films);
  
  films.map(film => 
      film.genreNames = film.genre_ids.map(genreId => {
          return themovieApi.genresObject[genreId] || 'Unknown genre';
        })
    );
    console.log(films);

  galleryEl.insertAdjacentHTML('beforeend', createFilmCards(films));
}

function onQueueBtnClick(event) {
  const moviesInQueue = localStorageService.load('queue');

  if (moviesInQueue === undefined) {
    return;
  }

  for (const prop in moviesInQueue) {
    galleryEl.insertAdjacentHTML('beforeend', createFilmCards(prop));
  }
}
