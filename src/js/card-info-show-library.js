'use strict';

import { ThemoviedbAPI } from './api';
import { createCardInfo } from './card-info-library';
import localStorageService from './localStorage.js';
import { showLoader, hideLoader } from './loaders';
import { createFilmsMarkupByIds } from './click-library-btn';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const theMovieById = new ThemoviedbAPI();
export const watched = localStorageService.load('watched')
  ? [...localStorageService.load('watched')]
  : [];
export const queue = localStorageService.load('queue')
  ? [...localStorageService.load('queue')]
  : [];

(() => {
  const refs = {
    openCardInfoEl: document.querySelector('.film-card__list.film-card__list'),
    closeCardInfoEl: document.querySelector('[data-modal-close-card]'),
    modalCardInfo: document.querySelector('[data-modal-card]'),
    modalCardContent: document.querySelector('.modal-card__content'),
    trailerBtn: document.querySelector('.trailer-btn'),
    body: document.querySelector('body'),
    galleryEl: document.querySelector('.library-film-card__list'),
    watchedBtnEl: document.querySelector('.js-watched'),
    queueBtnEl: document.querySelector('.js-queue'),
    qPagination: document.querySelector('#q-pagination'),
    infoCard: document.querySelector('.info-card'),
  };

  let watchBtn;
  let queueBtn;

  const onOpenCardInfoElClick = async event => {
    if (event.target.nodeName !== 'UL') {
      refs.modalCardInfo.classList.remove('is-hidden');
      refs.body.classList.add('no-scroll');
      document.addEventListener('keydown', onEscKeyBtnPress);

      const movieId = event.target.getAttribute('data-id');

      await theMovieById
        .fetchFilmInfo(movieId)
        .then(data => {
          refs.modalCardContent.innerHTML = createCardInfo(data);
          watchBtn = document.querySelector('.modal-card__watch-btn');
          watchBtn.addEventListener('click', onAddWatchedBtnClick);

          queueBtn = document.querySelector('.modal-card__queue-btn');
          queueBtn.addEventListener('click', onAddQueueBtnClick);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const onCloseCardInfoElClick = () => {
    refs.modalCardInfo.classList.add('is-hidden');
    refs.body.classList.remove('no-scroll');
    refs.modalCardContent.innerHTML = '';
    document.removeEventListener('keydown', onEscKeyBtnPress);
  };

  const onEscKeyBtnPress = event => {
    if (event.code === 'Escape') {
      onCloseCardInfoElClick();
    }
  };

  const onModalCardInfoClick = event => {
    const { target, currentTarget } = event;

    if (target.classList.contains('modal-card__watch-btn')) {
      target.addEventListener('click', onAddWatchedBtnClick);
    }

    if (target.classList.contains('modal-card__queue-btn')) {
      target.addEventListener('click', onAddQueueBtnClick);
    }
    if (target.classList.contains('trailer-btn')) {
      target.addEventListener('click', onAddTrailerClick);
    }

    async function onAddTrailerClick(event) {
      const movieId = event.target.getAttribute('data-id');
      theMovieById
        .fetchTrailer(movieId)
        .then(data => {
          console.log(movieId);
          console.log(data);
          renderTrailer(data);
        })
        .catch(console.log);
    }

    function renderTrailer(data) {
      const instance = basicLightbox
        .create(
          `<div class="modal-trailer-backdrop">
          <iframe class="iframe" width="640" height="480" frameborder="0"
            src="https://www.youtube.com/embed/${data.results[0].key}" >
          </iframe>
     </div>`,
          {
            onShow: instance => {
              // Close when hitting escape.
              document.onkeydown = function (evt) {
                evt = evt || window.event;
                var isEscape = false;
                if ('key' in evt) {
                  isEscape = evt.key === 'Escape' || evt.key === 'Esc';
                } else {
                  isEscape = evt.keyCode === 27;
                }
                if (isEscape) {
                  instance.close();
                }
              };
            },
          }
        )
        .show();
    }

    async function onAddQueueBtnClick() {
      const movieId = target.getAttribute('data-id');
      theMovieById
        .fetchFilmInfo(movieId)
        .then(data => {
          localStorageService.save('queue', queue);
        })
        .catch(err => {
          console.log(err);
        });
    }

    if (target !== currentTarget) {
      return;
    }

    onCloseCardInfoElClick();
  };

  const onModalCardContentClick = async event => {
    const idEl = event.currentTarget.querySelector('[data-id]');
    const getId = idEl.getAttribute('data-id');

    const { target } = event;
    if (target.nodeName !== 'BUTTON') {
      return;
    }

    if (
      target.classList.contains('modal-card__watch-btn') &&
      !watched.includes(getId)
    ) {
      watched.push(getId);
      localStorage.setItem('watched', JSON.stringify(watched));
      target.addEventListener('click', onRemoveBtnClick);
      target.textContent = 'remove from watched';
      target.classList.remove('js-remove-watched');
      if (refs.watchedBtnEl.classList.contains('is-active-btn')) {
        refs.galleryEl.innerHTML = '';
        const watchedMovies = localStorageService.load('watched');
        const filmCardsWatched = await createFilmsMarkupByIds(watchedMovies);

        refs.galleryEl.insertAdjacentHTML('afterbegin', filmCardsWatched);
      }

      return;
    }

    if (
      target.classList.contains('modal-card__watch-btn') &&
      watched.includes(getId)
    ) {
      watched.splice(watched.indexOf(getId), 1);
      localStorage.setItem('watched', JSON.stringify(watched));
      target.textContent = 'add to watched';
      target.classList.add('js-remove-watched');
      if (refs.watchedBtnEl.classList.contains('is-active-btn')) {
        refs.galleryEl.innerHTML = '';
        const watchedMovies = localStorageService.load('watched');
        if (!watchedMovies || watchedMovies.length < 1) {
          refs.qPagination.classList.add('visually-hidden');
          refs.infoCard.classList.remove('visually-hidden');
          refs.galleryEl.style.height = '600px';
          return;
        }
        const filmCardsWatched = await createFilmsMarkupByIds(watchedMovies);

        refs.galleryEl.insertAdjacentHTML('afterbegin', filmCardsWatched);
      }

      return;
    }

    if (
      target.classList.contains('modal-card__queue-btn') &&
      !queue.includes(getId)
    ) {
      queue.push(getId);
      localStorage.setItem('queue', JSON.stringify(queue));
      target.textContent = 'remove from queue';
      target.classList.remove('js-remove-queue');
      if (refs.queueBtnEl.classList.contains('is-active-btn')) {
        refs.galleryEl.innerHTML = '';
        const queMovies = localStorageService.load('queue');
        const filmCardsQue = await createFilmsMarkupByIds(queMovies);

        refs.galleryEl.insertAdjacentHTML('afterbegin', filmCardsQue);
      }
      return;
    }

    if (
      target.classList.contains('modal-card__queue-btn') &&
      queue.includes(getId)
    ) {
      queue.splice(queue.indexOf(getId), 1);
      localStorage.setItem('queue', JSON.stringify(queue));
      target.textContent = 'add to queue';
      target.classList.add('js-remove-queue');
      if (refs.queueBtnEl.classList.contains('is-active-btn')) {
        refs.galleryEl.innerHTML = '';
        const queMovies = localStorageService.load('queue');
        if (!queMovies || queMovies.length < 1) {
          refs.qPagination.classList.add('visually-hidden');
          refs.infoCard.classList.remove('visually-hidden');
          refs.galleryEl.style.height = '600px';
          return;
        }
        const filmCardsQue = await createFilmsMarkupByIds(queMovies);

        refs.galleryEl.insertAdjacentHTML('afterbegin', filmCardsQue);
      }

      return;
    }
  };

  refs.openCardInfoEl.addEventListener('click', onOpenCardInfoElClick);
  refs.closeCardInfoEl.addEventListener('click', onCloseCardInfoElClick);
  refs.modalCardInfo.addEventListener('click', onModalCardInfoClick);
  refs.modalCardContent.addEventListener('click', onModalCardContentClick);

  async function onAddQueueBtnClick(e) {
    const movieId = e.target.getAttribute('data-id');
    if (queue.includes(movieId)) {
      return;
    }

    theMovieById
      .fetchFilmInfo(movieId)
      .then(data => {
        localStorageService.save('queue', queue);
      })
      .catch(err => {
        console.log(err);
      });
  }
  async function onAddWatchedBtnClick(e) {
    const movieId = e.target.getAttribute('data-id');
    if (watched.includes(movieId)) {
      return;
    }

    await theMovieById
      .fetchFilmInfo(movieId)
      .then(data => {
        localStorageService.save('watched', watched);
      })
      .catch(err => {
        console.log(err);
      });
  }
})();

async function onRemoveBtnClick(e) {
  const movieId = e.target.getAttribute('data-id');
}
