'use strict';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import {
  Notify
} from 'notiflix/build/notiflix-notify-aio';
import {
  showLoader,
  hideLoader
} from './loaders';
import localStorageService from './localStorage';
import {
  createCardById
} from './library-create-card';
import {
  ThemoviedbAPI
} from './api';
import {
  getPagination
} from './pagination-ilibrary';
import {
  onLibraryBtnClick
} from './click-library-btn';
import {
  createFilmsMarkupByIds
} from './click-library-btn';

const galleryEl = document.querySelector('.library-film-card__list');
const watchedBtnEl = document.querySelector('.js-watched');
const queueBtnEl = document.querySelector('.js-queue');
const container = document.querySelector('#pagination');
const footer = document.querySelector('.footer');
const main = document.querySelector('main');

const theMovieById = new ThemoviedbAPI();

watchedBtnEl.addEventListener('click', onLibraryBtnClick);
// queueBtnEl.addEventListener('click', onQueueBtnClick);

// async function onQueueBtnClick() {
//   showLoader();
//   queueBtnEl.classList.add('is-active-btn');
//   watchedBtnEl.classList.remove('is-active-btn');
//   galleryEl.innerHTML = '';
//   const queuedMovies = localStorageService.load('queue');

//   if (!queuedMovies) {
//     Notify.failure(
//       'Sorry, there are no films matching your search query. Please try again.'
//     );

//     hideLoader();

//     main.innerHTML = `<div class="info-card">
//     <p>you don't have any movies to watch yet((</p>
//   </div>`;
//     main.style.height = '738px';
//     container.classList.add('visually-hidden');
//     footer.style.position = 'fixed';
//     footer.style.bottom = '0';
//     footer.style.left = '50%';
//     footer.style.transform = 'translateX(-50%)';
//   }

//   hideLoader();

//   if (queuedMovies.length > 6) {
//     const filmCards = await createFilmsMarkupByIds(queuedMovies.slice(0, 6));

//     galleryEl.insertAdjacentHTML('afterbegin', filmCards);

//     getPagination(queuedMovies);

//     return;
//   }

//   const filmCards = await createFilmsMarkupByIds(queuedMovies);

//   galleryEl.insertAdjacentHTML('afterbegin', filmCards);
// }