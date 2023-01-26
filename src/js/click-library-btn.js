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
const infoCard = document.querySelector('.info-card');
const theMovieById = new ThemoviedbAPI();
onLibraryBtnClick();

export async function onLibraryBtnClick() {
  container.classList.remove('visually-hidden');
  showLoader();
  queueBtnEl.classList.remove('is-active-btn');
  watchedBtnEl.classList.add('is-active-btn');
  galleryEl.innerHTML = '';
  const watchedMovies = localStorageService.load('watched');

  if (!watchedMovies || watchedMovies.length < 1) {
    Notify.failure(
      'Sorry, there are no films matching your search query. Please try again.'
    );

    hideLoader();
    infoCard.classList.remove('visually-hidden');
    galleryEl.style.height = '438px';
    return
  
  }
  hideLoader();
  infoCard.classList.add('visually-hidden');
  galleryEl.style.height = 'fit-content';
  if (watchedMovies.length > 6) {
    const filmCards = await createFilmsMarkupByIds(watchedMovies.slice(0, 6));

    galleryEl.insertAdjacentHTML('afterbegin', filmCards);
    getPagination(watchedMovies);

    return;
  }

  const filmCards = await createFilmsMarkupByIds(watchedMovies);

  galleryEl.insertAdjacentHTML('afterbegin', filmCards);
}

export async function createFilmsMarkupByIds(filmIDs) {

  // if(filmIDs.length < 1){
  //   return
  // }
  const films = await Promise.all(
    filmIDs.map(theMovieById.fetchFilmInfo.bind(theMovieById))
  );


  return films.reduce((filmCards, film) => {
    const arrId = film.genres.map(el => el.id);
    film.genreNames = arrId.map(genreId => {
      return theMovieById.genresObject[genreId] || 'Unknown genre';
    });
    return filmCards + createCardById(film);
  }, '');
}
