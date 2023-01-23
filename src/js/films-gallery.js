'use strict';

import { ThemoviedbAPI } from './api';
import { createFilmCards } from './film-card';
import Notiflix from 'notiflix';

Notiflix.Notify.init({ clickToClose: true });

const themoviedbAPI = new ThemoviedbAPI();

const galleryEl = document.querySelector('.film-card__list');
const formEl = document.querySelector('.search-form#home-page');
const submitBtnEl = document.querySelector('.search-form .search-btn');
const errorMessage = document.querySelector('.warning');

// formEl.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();

  const inputValue = event.currentTarget.elements.query.value;

  submitBtnEl.disabled = true;
  themoviedbAPI.query = inputValue;
  errorMessage.classList.add('is-hidden');
  if (inputValue === '') {
    galleryEl.innerHTML = '';
    submitBtnEl.disabled = false;
    return;
  }

  try {
    
    const genres = await themoviedbAPI.fetchGenresMovieList();

    const filmsByQuery = await themoviedbAPI.fetchFilmByQuery();
    const { results } = filmsByQuery;

    if (results.length === 0) {
      errorMessage.classList.remove('is-hidden');
      // Notiflix.Notify.failure(
      //   'Sorry, there are no movies matching your search query. Please try again ♥'
      // );
      
      galleryEl.innerHTML = '';
      submitBtnEl.disabled = false;
      return;
    }

    results.forEach(film => {
      film.genreNames = film.genre_ids
        .map(filmID => genres.find(({ id }) => id === filmID))
        .map(({ name }) => name);
    });

    galleryEl.innerHTML = createFilmCards(results);
  } catch (err) {
    console.log(err);
  } finally {
    submitBtnEl.disabled = false;
  }
}

// galleryEl.addEventListener('click', onFilmCardClick);

// function onFilmCardClick(event) {
//   if (event.target.nodeName !== 'LI') {
//     return;
//   }
//  ВІДКРИВАННЯ МОДАЛКИ
// }
