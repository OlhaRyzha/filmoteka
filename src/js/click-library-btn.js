'use strict';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ThemoviedbAPI } from './api';
import { createCardInfo } from './card-info';
import localStorageService from './localstorage.js';
import { createCardById } from './library-create-card';
import { showLoader, hideLoader } from './loaders';
import { getPagination } from './pagination-ilibrary';

const galleryEl = document.querySelector('.library-film-card__list');
const libraryBtn = document.querySelector('.library__js');
const container = document.querySelector('#pagination');
const footer = document.querySelector('.footer');
const main = document.querySelector('main');
const watchedBtnEl = document.querySelector('.js-watched');
const queueBtnEl = document.querySelector('.js-queue');
const theMovieById = new ThemoviedbAPI();
onLibraryBtnClick();

export async function onLibraryBtnClick() {
  showLoader();
  queueBtnEl.classList.remove('is-active-btn');
  watchedBtnEl.classList.add('is-active-btn');
  galleryEl.innerHTML = '';
  const watchedMovies = localStorageService.load('watched');

  if (!watchedMovies) {
    Notify.failure(
      'Sorry, there are no films matching your search query. Please try again.'
    );

    hideLoader();

    main.innerHTML = `<div class="info-card">
    <p>you don't have any movies to watch yet((</p>
  </div>`;
    // main.style.backgroundColor = 'var(--bg-color)';
    main.style.height = '738px';

    container.classList.add('visually-hidden');
    footer.style.position = 'fixed';
    footer.style.bottom = '0';
    footer.style.left = '50%';
    footer.style.transform = 'translateX(-50%)';
  }
  hideLoader();
  watchedMovies.map(el => {
    theMovieById.fetchFilmInfo(el).then(data => {
      const arrId = data.genres.map(el => el.id);
      data.genreNames = arrId.map(genreId => {
        return theMovieById.genresObject[genreId] || 'Unknown genre';
      });

      galleryEl.insertAdjacentHTML('afterbegin', createCardById(data));

      const results = watchedMovies.length;

      getPagination(results, data);
    });
  });
}
