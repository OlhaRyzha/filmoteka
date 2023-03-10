import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { ThemoviedbAPI } from './api';
import { createFilmCards } from './film-card';
import Notiflix from 'notiflix';
import { onLibraryBtnClick } from './api';

const themoviedb = new ThemoviedbAPI();
const galleryEl = document.querySelector('.film-card__list');

const container = document.querySelector('#pagination');


export async function getPagination() {
  try {

    const { total_results } = await themoviedb.fetchTrendMovies();

    const options = {
      totalItems: total_results < 20 ? total_results : 200,
      itemsPerPage: 20,
      visiblePages: 5,
    };

    const pagination = new Pagination(container, options);

    const containerfirst = document.querySelector('.tui-page-btn.tui-first');
    const containerlast = document.querySelector('.tui-page-btn.tui-last')
    containerlast.innerHTML = `${total_results < 20 ? total_results : Math.round(options.totalItems / options.itemsPerPage)}`;
    containerfirst.innerHTML = '1';

    pagination.on('afterMove', function (eventData) {

      themoviedb.page = eventData.page;
      

      themoviedb
        .fetchTrendMovies()
        .then(data => {
          data.results.map(film => {
            film.genreNames = film.genre_ids.map(genreId => {
              return themoviedb.genresObject[genreId] || 'Unknown genre';
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
