'use strict';

import localStorageService from './localstorage.js';
import { createFilmCards } from './film-card';

const galleryEl = document.querySelector('.film-card__list');
const watchedBtnEl = document.querySelector('.js-watched');
const queueBtnEl = document.querySelector('.js-queue');

watchedBtnEl.addEventListener('click', onWatchedBtnClick);
queueBtnEl.addEventListener('click', onQueueBtnClick);

function onWatchedBtnClick(event) {
  const watchedMovies = localStorageService.load('watched');
  console.log(watchedMovies);
  if (watchedMovies === undefined) {
    return;
  }

  for (const prop in watchedMovies) {
    galleryEl.insertAdjacentHTML('beforeend', createFilmCards(prop));
  }
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
