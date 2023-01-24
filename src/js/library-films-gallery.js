'use strict';
import { showLoader, hideLoader } from './loaders';
import localStorageService from './localStorage';
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
// queueBtnEl.addEventListener('click', onQueueBtnClick);

function onWatchedBtnClick(event) {
  showLoader();
  galleryEl.innerHTML = '';
  const watchedMovies = localStorageService.load('watched');
  console.log(watchedMovies);

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

      const { poster_path, title, release_date, vote_average, genreNames, id } =
        data;

    const card =  `
        <li class="film-card__item" ${
          poster_path === null ? 'style = "position: relative;"' : ''
        }>
            <img src="${
              poster_path === null
                ? 'http://surl.li/emwqv'
                : 'https://image.tmdb.org/t/p/original' + poster_path
            }" alt="${
        title + ' poster'
      }" class="film-card__poster" data-id='${id}' />
            ${
              poster_path === null
                ? `<p style = "position: absolute; top: 47%; left: 50%; transform: translate(-50%, -50%); font-size: 20px; user-select: none;" data-id='${id}'>No poster</p>`
                : ''
            }
            <div class="film-card__content">
                <h2 class="film-card__title" data-id='${id}'>${title}</h2>
                <p class="film-card__genre" data-id='${id}'>
                  ${
                    (genreNames.length > 2)
                      ? genreNames.slice(0, 2).join(', ') +
                        `<span data-id="${id}" class="js-other-genres">, Other</span>`
                      : genreNames.join(', ')
                  }
                    <span class="film-card__release-date" data-id='${id}' ${
        release_date === '' ? "style = 'display: none;'" : ''
      } 
                    ${
                      (genreNames.length === 0)
                        ? "style = 'margin-left: 0px;'"
                        : ''
                    }>
                      ${
                        release_date === ''
                          ? ''
                          : new Date(release_date).getFullYear()
                      }
                    </span>
                    <span class="film-card__rating" ${
                     ( genreNames.length === 0) && (release_date === '')
                        ? "style = 'margin-left: 0px;'"
                        : ''
                    }
                    ${(release_date === '') ? "style = 'margin-left: 8px;'" : ''}
                    >
                      ${vote_average.toFixed(1)}
                    </span>
                </p>
            </div>
        </li>
      `
 
     
      // console.log(card)
      galleryEl.insertAdjacentHTML('afterbegin', card);

    } )

  })
  // async function getPagination() {
  //   try {
  //     const  total_results = watchedMovies.length;
  
  //     const options = {
  //       totalItems: total_results,
  //       itemsPerPage: 20,
  //       visiblePages: 5,
  //     };
  
  //     const pagination = new Pagination(container, options);
  
  //     pagination.on('afterMove', function (eventData) {
  
  //       themoviedb.page = eventData.page;
  
  //       themoviedb
  //         .fetchTrendMovies()
  //         .then(data => {
  //           data.results.map(film => {
  //             film.genreNames = film.genre_ids.map(genreId => {
  //               return themoviedb.genresObject[genreId] || 'Unknown genre';
  //             });
  //           });
  
  //           galleryEl.innerHTML = createFilmCards(data.results);
  //         })
  //         .catch(err => {
  //           console.log(err);
  //         });
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }
  
  // getPagination();
  hideLoader();
}

// function onQueueBtnClick(event) {
//   showLoader();

//   const moviesInQueue = localStorageService.load('queue');

//   if (moviesInQueue === undefined) {
//     hideLoader();
//     return;
//   }

//   for (const prop in moviesInQueue) {
//     galleryEl.insertAdjacentHTML('beforeend', createFilmCards(prop));
//   }

//   hideLoader();
// }
