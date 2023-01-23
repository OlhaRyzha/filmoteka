'use strict';

import { ThemoviedbAPI } from './api';
import { createCardInfo } from './card-info';
import localStorageService from './localstorage.js';

const theMovieById = new ThemoviedbAPI();

(() => {
  const refs = {
    openCardInfoEl: document.querySelector('.film-card__list.film-card__list'),
    closeCardInfoEl: document.querySelector('[data-modal-close-card]'),
    modalCardInfo: document.querySelector('[data-modal-card]'),
    modalCardContent: document.querySelector('.modal-card__content'),
    body: document.querySelector('body'),
  };
  let movieId;
  let watchBtn;
  let queueBtn;

  const onOpenCardInfoElClick = async event => {
    if (event.target.nodeName !== 'UL') {
      refs.modalCardInfo.classList.remove('is-hidden');
      refs.body.classList.add('no-scroll');
      document.addEventListener('keydown', onEscKeyBtnPress);

      movieId = event.target.getAttribute('data-id');

      const data = await theMovieById.fetchFilmInfo(movieId);

      refs.modalCardContent.innerHTML = createCardInfo(data);

      watchBtn = document.querySelector('.modal-card__watch-btn');
      watchBtn.addEventListener('click', onAddWatchedBtnClick);
      
      queueBtn = document.querySelector('.modal-card__queue-btn');
      queueBtn.addEventListener('click', onAddQueueBtnClick);
      
      return data;

      }
    };
    
  function onAddWatchedBtnClick(event) {
    event.currentTarget.disabled = true; 
    if (theMovieById.watchArray.includes(movieId)) {
        return
      }
      theMovieById.watchArray.push(movieId);
      localStorageService.save('watched', theMovieById.watchArray);
  };
    
    function onAddQueueBtnClick(event) {
      event.currentTarget.disabled = true;  
      if (theMovieById.queueArray.includes(movieId)) {
        return
      }
      theMovieById.queueArray.push(movieId);
      localStorageService.save('queue', theMovieById.queueArray);
  };

  const onCloseCardInfoElClick = () => {
    refs.modalCardInfo.classList.add('is-hidden');
    refs.body.classList.remove('no-scroll');
    refs.modalCardContent.innerHTML = '';
    document.removeEventListener('keydown', onEscKeyBtnPress);
    watchBtn.removeEventListener('click', onAddWatchedBtnClick);
    queueBtn.removeEventListener('click', onAddQueueBtnClick);
  };

  const onEscKeyBtnPress = event => {
    if (event.code === 'Escape') {
      onCloseCardInfoElClick();
    }
  };

  // const onModalCardInfoClick = event => {
  //   const { target, currentTarget } = event;

  //           if(target.classList.contains('modal-card__watch-btn')){
  //             target.addEventListener('click', onAddWatchedBtnClick);
  //           }

  //       async function onAddWatchedBtnClick() {
  //           const movieId = target.getAttribute('data-id');
  //           theMovieById
  //           .fetchFilmInfo(movieId)
  //           .then(data => {
  //             localStorageService.save('watched', data);
  //           })
  //           .catch(err => {
  //             console.log(err);
  //           });

  //         };
  //           if(target.classList.contains('modal-card__queue-btn')){
  //             target.addEventListener('click', onAddQueueBtnClick);
  //           }

  //           if(target.classList.contains('modal-card__queue-btn')){
  //             target.addEventListener('click', onAddQueueBtnClick);
  //           }

  //      async function onAddQueueBtnClick() {
  //           const movieId = target.getAttribute('data-id');
  //           theMovieById
  //           .fetchFilmInfo(movieId)
  //           .then(data => {
  //             localStorageService.save('queue', data);
  //             console.log(data)
  //           })
  //           .catch(err => {
  //             console.log(err);
  //           });

  //         };

  //   if (target !== currentTarget) {
  //     return;
  //   }

  //   onCloseCardInfoElClick();
  // };

  refs.openCardInfoEl.addEventListener('click', onOpenCardInfoElClick);
  refs.closeCardInfoEl.addEventListener('click', onCloseCardInfoElClick);
  // refs.modalCardInfo.addEventListener('click', onModalCardInfoClick);
})();
