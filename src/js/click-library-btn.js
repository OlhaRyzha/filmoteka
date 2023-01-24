'use strict';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ThemoviedbAPI } from './api';
import { createCardInfo } from './card-info';
import localStorageService from './localstorage.js';
import { createCardById } from './library-create-card';
import { showLoader, hideLoader } from './loaders';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

const galleryEl = document.querySelector('.library-film-card__list');
const libraryBtn = document.querySelector('.library__js');
const container = document.querySelector('#pagination');
const footer = document.querySelector('.footer__container');

console.log(libraryBtn);
const theMovieById = new ThemoviedbAPI();
libraryBtn.addEventListener('click', onLibraryBtnClick);
 
export async function onLibraryBtnClick(){
  showLoader();

  galleryEl.innerHTML ='';
  const watchedMovies = localStorageService.load('watched');
 
  if(!watchedMovies){
    Notify.failure(
      'Sorry, there are no films matching your search query. Please try again.'
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
  }
  hideLoader();
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

  console.log(watchedMovies);
}