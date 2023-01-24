'use strict';
import { showLoader, hideLoader } from './loaders';
import localStorageService from './localStorage';
import { createCardById } from './library-create-card';
import { ThemoviedbAPI } from './api';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

const galleryEl = document.querySelector('.film-card__list');
const watchedBtnEl = document.querySelector('.js-watched');
const queueBtnEl = document.querySelector('.js-queue');
const container = document.querySelector('#pagination');

const theMovieById = new ThemoviedbAPI();

if (!watchedBtnEl || !queueBtnEl) {
  return;
}

watchedBtnEl.addEventListener('click', onWatchedBtnClick);
queueBtnEl.addEventListener('click', onQueueBtnClick);

async function onWatchedBtnClick(event) {
  galleryEl.innerHTML = '';
  showLoader();
 const watchedMovies = localStorageService.load('watched');
 

  if (watchedMovies === undefined) {
    hideLoader();
    return;
  }

  watchedMovies.map(el => {
    theMovieById.fetchFilmInfo(el).then(data => {
      // console.log();
      const arrId = data.genres.map(el => el.id);
      data.genreNames = arrId.map(genreId => {
        return theMovieById.genresObject[genreId] || 'Unknown genre';
      });

      // console.log(card)
      galleryEl.insertAdjacentHTML('afterbegin', createCardById(data));

      async function getPagination() {
        try {
          const results = watchedMovies.length;
      
          const options = {
            totalItems: results,
            itemsPerPage: 20,
            visiblePages: 5,
          };
      
          const pagination = new Pagination(container, options);
      
          pagination.on('afterMove', function (eventData) {
      
            theMovieById.page = eventData.page;
      
            galleryEl.innerHTML = createCardById(data);
             
          });
        } catch (error) {
          console.log(error.message);
        }
      }
      
      getPagination();
      
    });
  });

  hideLoader();
}

async function onQueueBtnClick(event) {
  galleryEl.innerHTML = '';
  showLoader();

 const queuedMovies = localStorageService.load('queue');


  if (queuedMovies === undefined) {
    hideLoader();
    return;
  }

  queuedMovies.map(el => {
    theMovieById.fetchFilmInfo(el).then(data => {
  
      const arrId = data.genres.map(el => el.id);
      data.genreNames = arrId.map(genreId => {
        return theMovieById.genresObject[genreId] || 'Unknown genre';
      });

      // console.log(card)
      galleryEl.insertAdjacentHTML('afterbegin', createCardById(data));

      async function getPagination() {
        try {
          const results = queuedMovies.length;
      
          const options = {
            totalItems: results,
            itemsPerPage: 20,
            visiblePages: 5,
          };
      
          const pagination = new Pagination(container, options);
      
          pagination.on('afterMove', function (eventData) {
      
            theMovieById.page = eventData.page;
      
            galleryEl.innerHTML = createCardById(data);
             
          });
        } catch (error) {
          console.log(error.message);
        }
      }
      
      getPagination();
    });
  });

  hideLoader();
}
