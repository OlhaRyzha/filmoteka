'use strict';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { showLoader, hideLoader } from './loaders';
import localStorageService from './localStorage';
import { createCardById } from './library-create-card';
import { ThemoviedbAPI } from './api';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

const galleryEl = document.querySelector('.library-film-card__list');
const watchedBtnEl = document.querySelector('.js-watched');
const queueBtnEl = document.querySelector('.js-queue');
const container = document.querySelector('#pagination');
const footer = document.querySelector('.footer__container');

const theMovieById = new ThemoviedbAPI();

if (!watchedBtnEl || !queueBtnEl) {
  return;
}

watchedBtnEl.addEventListener('click', onWatchedBtnClick);
queueBtnEl.addEventListener('click', onQueueBtnClick);

async function onWatchedBtnClick(event) {
  galleryEl.innerHTML = '';
  showLoader();
  queueBtnEl.classList.remove('is-active-btn');
  watchedBtnEl.classList.add('is-active-btn');
 const watchedMovies = localStorageService.load('watched');
 


  if(!watchedMovies){
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
    watchedMovies.map(el => {
      theMovieById.fetchFilmInfo(el).then(data => {
  
        const arrId = data.genres.map(el => el.id);
        data.genreNames = arrId.map(genreId => {
          return theMovieById.genresObject[genreId] || 'Unknown genre';
        });
  
  
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
            const containerfirst = document.querySelector('.tui-page-btn.tui-first');
            const containerlast = document.querySelector('.tui-page-btn.tui-last')
            containerlast.innerHTML = `${total_results < 20 ? results : Math.round(options.totalItems / options.itemsPerPage)}`;
            containerfirst.innerHTML = '1';
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
  }
  
 

  hideLoader();
}

async function onQueueBtnClick(event) {
  galleryEl.innerHTML = '';
  showLoader();
  queueBtnEl.classList.add('is-active-btn');
  watchedBtnEl.classList.remove('is-active-btn');
 const queuedMovies = localStorageService.load('queue');

 if(!queuedMovies){
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
  queuedMovies.map(el => {
    theMovieById.fetchFilmInfo(el).then(data => {

      const arrId = data.genres.map(el => el.id);
      data.genreNames = arrId.map(genreId => {
        return theMovieById.genresObject[genreId] || 'Unknown genre';
      });


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
          const containerfirst = document.querySelector('.tui-page-btn.tui-first');
          const containerlast = document.querySelector('.tui-page-btn.tui-last')
          containerlast.innerHTML = `${total_results < 20 ? total_results : Math.round(options.totalItems / options.itemsPerPage)}`;
          containerfirst.innerHTML = '1';
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
}



hideLoader();
}