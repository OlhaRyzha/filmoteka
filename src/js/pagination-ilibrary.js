'use strict';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
const container = document.querySelector('#pagination');
import { ThemoviedbAPI } from './api';
import { createCardById } from './library-create-card';
import { createFilmsMarkupByIds } from './click-library-btn';

const theMovieById  = new ThemoviedbAPI();
const galleryEl = document.querySelector('.film-card__list');


export async function getPagination(results) {
  try {

      const options = {
      totalItems: results.length ,
      itemsPerPage: 6,
      visiblePages: 5,
    };

    const pagination = new Pagination(container, options);

    const containerfirst = document.querySelector('.tui-page-btn.tui-first');
    const containerlast = document.querySelector('.tui-page-btn.tui-last')
    containerlast.innerHTML = `${Math.ceil(results / options.itemsPerPage)}`;
    containerfirst.innerHTML = '1';

    pagination.on('afterMove', async function ({ page }) {

      const startPosition = 6 * page - 6;

      const endPosition = 6 *  page;

      const filmCards = await createFilmsMarkupByIds(results.slice(startPosition, endPosition));

      galleryEl.innerHTML =  filmCards;

    });
  } catch (error) {
    console.log(error.message);
  }
}


