'use strict';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { showLoader, hideLoader } from './loaders';
import localStorageService from './localStorage';
import { createCardById } from './library-create-card';
import { ThemoviedbAPI } from './api';
import {getPagination}  from './pagination-ilibrary';

const galleryEl = document.querySelector('.library-film-card__list');
const watchedBtnEl = document.querySelector('.js-watched');
const queueBtnEl = document.querySelector('.js-queue');
const container = document.querySelector('#pagination');
const footer = document.querySelector('.footer__container');

const theMovieById = new ThemoviedbAPI();



watchedBtnEl.addEventListener('click', onWatchedBtnClick);
queueBtnEl.addEventListener('click', onQueueBtnClick);

async function onWatchedBtnClick(event) {
  galleryEl.innerHTML = '';
  showLoader();
  queueBtnEl.classList.remove('is-active-btn');
  watchedBtnEl.classList.add('is-active-btn');

 const watchedMovies = localStorageService.load('watched');
createMovieCard(watchedMovies)
}


async function onQueueBtnClick(event) {
  galleryEl.innerHTML = '';
  showLoader();
  queueBtnEl.classList.add('is-active-btn');
  watchedBtnEl.classList.remove('is-active-btn');

 const queuedMovies = localStorageService.load('queue');

createMovieCard(queuedMovies)
}



async function createMovieCard(arr){
  if(!arr){
    hideLoader();
    Notify.failure(
      'Sorry, there are no filmes matching your search query. Please try again.'
    );
    hideLoader();

    galleryEl.innerHTML = `<div class="info-card">
    <p>you don't have any movies to watch yet((</p>
  </div>`
    container.classList.add('visually-hidden');
    footer.style.position = 'fixed';
    footer.style.bottom = '0';
    footer.style.left = '50%';
    footer.style.transform = 'translateX(-50%)';
  }else{
   arr.map(el => {
      theMovieById.fetchFilmInfo(el).then(data => {
  
        const arrId = data.genres.map(el => el.id);
        data.genreNames = arrId.map(genreId => {
          return theMovieById.genresObject[genreId] || 'Unknown genre';
        });
  
  
        galleryEl.insertAdjacentHTML('afterbegin', createCardById(data));
  
        const results = arr.length;

         getPagination(results, data)
        
      });
    });
  }
  
 

  hideLoader();
}