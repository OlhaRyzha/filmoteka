'use strict';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { showLoader, hideLoader } from './loaders';
import { ThemoviedbAPI } from './api';
import { createFilmCards } from './film-card';

const themoviedbAPI = new ThemoviedbAPI();

const galleryEl = document.querySelector('.film-card__list');
const formEl = document.querySelector('.search-form#home-page');
const submitBtnEl = document.querySelector('.search-form .search-btn');
const errorMessage = document.querySelector('.warning');
const container = document.querySelector('#pagination');

formEl.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();

  showLoader();

  submitBtnEl.disabled = true;
  const inputValue = event.currentTarget.elements.query.value;
  themoviedbAPI.query = inputValue;
  errorMessage.classList.add('is-hidden');
  if (inputValue.length === 0) {
    hideLoader();
    event.target.reset();
    galleryEl.innerHTML = '';
    // submitBtnEl.disabled = false;
    return;
  }

  try {
    const genres = await themoviedbAPI.fetchGenresMovieList();

    const filmsByQuery = await themoviedbAPI.fetchFilmByQuery();
    const { results, total_results } = filmsByQuery;
    console.log(total_results);
    async function getPagination() {
      try {
        const options = {
          totalItems: total_results,
          itemsPerPage: 20,
          visiblePages: 5,
        };

        const pagination = new Pagination(container, options);

        pagination.on('afterMove', function (eventData) {
          themoviedbAPI.page = eventData.page;

          themoviedbAPI
            .fetchFilmByQuery()
            .then(data => {
              data.results.map(film => {
                film.genreNames = film.genre_ids.map(genreId => {
                  return themoviedbAPI.genresObject[genreId] || 'Unknown genre';
                });
              });

              galleryEl.innerHTML = createFilmCards(data.results);
            })
            .catch(err => {
              console.log(err);
            });
        });
      } catch (error) {
        console.log(error.message);
      }
    }

    getPagination();

    if (results.length === 0) {
      errorMessage.classList.remove('is-hidden');
      event.target.reset();
      // Notiflix.Notify.failure(
      //   'Sorry, there are no movies matching your search query. Please try again ♥'
      // );

      // galleryEl.innerHTML = '';
      // submitBtnEl.disabled = false;
      return;
    }

    results.map(film => {
      film.genreNames = film.genre_ids.map(genreId => {
        return themoviedbAPI.genresObject[genreId] || 'Unknown genre';
      });
    });

    galleryEl.innerHTML = createFilmCards(results);
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
    submitBtnEl.disabled = false;
  }
}
