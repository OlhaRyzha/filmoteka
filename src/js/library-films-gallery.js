'use strict';
import { showLoader, hideLoader } from './loaders';
import localStorageService from './localStorage';
import { createFilmCards } from './film-card';

const galleryEl = document.querySelector('.film-card__list');
const watchedBtnEl = document.querySelector('.js-watched');
const queueBtnEl = document.querySelector('.js-queue');

if (!watchedBtnEl || !queueBtnEl) {
  return;
}

watchedBtnEl.addEventListener('click', onWatchedBtnClick);
queueBtnEl.addEventListener('click', onQueueBtnClick);

function onWatchedBtnClick(event) {
  showLoader();

  const watchedMovies = localStorageService.load('watched');
  console.log(watchedMovies);

  if (watchedMovies === undefined) {
    hideLoader();

    return;
  }

  for (const prop in watchedMovies) {
    galleryEl.insertAdjacentHTML('beforeend', createFilmCards(prop));
  }

  hideLoader();
}

function onQueueBtnClick(event) {
  showLoader();

  const moviesInQueue = localStorageService.load('queue');

  if (moviesInQueue === undefined) {
    hideLoader();
    return;
  }

  for (const prop in moviesInQueue) {
    galleryEl.insertAdjacentHTML('beforeend', createFilmCards(prop));
  }

  hideLoader();
}
