'use strict';
import { showLoader, hideLoader } from './loaders';
import { ThemoviedbAPI } from './api';
import { createFilmCards } from './film-card';

const themoviedbAPI = new ThemoviedbAPI();

const galleryEl = document.querySelector('.film-card__list');
const formEl = document.querySelector('.search-form#home-page');
const submitBtnEl = document.querySelector('.search-form .search-btn');
const errorMessage = document.querySelector('.warning');

if (!formEl) {
  return;
}

formEl.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();

  showLoader();

  submitBtnEl.disabled = true;
  const inputValue = event.currentTarget.elements.query.value;
  themoviedbAPI.query = inputValue;
  errorMessage.classList.add('is-hidden');

  if (inputValue === '') {
    hideLoader();
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

      hideLoader();
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
    hideLoader();
    submitBtnEl.disabled = false;
  }
}
