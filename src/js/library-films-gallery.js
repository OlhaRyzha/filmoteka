'use strict';
import { ThemoviedbAPI } from './api';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { showLoader, hideLoader } from './loaders';
import localStorageService from './localStorage';
import { createCardById } from './library-create-card';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { onLibraryBtnClick } from './click-library-btn';
import { createFilmsMarkupByIds } from './click-library-btn';

const galleryEl = document.querySelector('.library-film-card__list');
const watchedBtnEl = document.querySelector('.js-watched');
const queueBtnEl = document.querySelector('.js-queue');
const container = document.querySelector('#pagination');
const qPagination = document.querySelector('#q-pagination');
const footer = document.querySelector('.footer');
const infoCard = document.querySelector('.info-card');

const theMovieById = new ThemoviedbAPI();

watchedBtnEl.addEventListener('click', onLibraryBtnClick);
queueBtnEl.addEventListener('click', onQueueBtnClick);


async function onQueueBtnClick() {
  galleryEl.innerHTML = '';
  container.classList.add('visually-hidden');
   showLoader();
   queueBtnEl.classList.add('is-active-btn');
   watchedBtnEl.classList.remove('is-active-btn');
  const queuedMovies = localStorageService.load('queue');

  if (!queuedMovies || queuedMovies.length < 1) {
    Notify.failure(
      'Sorry, there are no films matching your search query. Please try again.'
    );
    qPagination.classList.add('visually-hidden');
    hideLoader();
    infoCard.classList.remove('visually-hidden');
    galleryEl.style.height = '600px';
    return
  
  }

  hideLoader();
  infoCard.classList.add('visually-hidden');
  galleryEl.style.height = 'fit-content';

  if (queuedMovies.length > 6) {
    qPagination.classList.remove('visually-hidden');
    const filmCards = await createFilmsMarkupByIds(queuedMovies.slice(0, 6));

    galleryEl.insertAdjacentHTML('afterbegin', filmCards);

    getPagination(queuedMovies);

    return;
  }

  const filmCards = await createFilmsMarkupByIds(queuedMovies);

  galleryEl.insertAdjacentHTML('afterbegin', filmCards);
}

async function getPagination(results) {
  try {

      const options = {
      totalItems: results.length ,
      itemsPerPage: 6,
      visiblePages: 5,
    };

    const pagination = new Pagination(qPagination, options);

    const containerfirst = document.querySelector('.tui-page-btn.tui-first');
    const containerlast = document.querySelector('.tui-page-btn.tui-last')
    containerlast.innerHTML = `${Math.ceil(results.length / 6)}`;
    containerfirst.innerHTML = '1';

    pagination.on('afterMove', async function ({ page }) {

      const startPosition = 6 * page - 6;

      const endPosition = 6 *  page;

      const filmCards = await createFilmsMarkupByIds(results.slice(startPosition, endPosition));

      galleryEl.innerHTML =  filmCards;

    });
  } catch (error) {
    console.log(error.message);
  }
}