'use strict';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
const container = document.querySelector('#pagination');
import { ThemoviedbAPI } from './api';
import { createCardById } from './library-create-card';

const theMovieById  = new ThemoviedbAPI();
const galleryEl = document.querySelector('.film-card__list');


export async function getPagination(results, data) {
  try {

      const options = {
      totalItems: results ,
      itemsPerPage: 20,
      visiblePages: 5,
    };

    const pagination = new Pagination(container, options);

    const containerfirst = document.querySelector('.tui-page-btn.tui-first');
    const containerlast = document.querySelector('.tui-page-btn.tui-last')
    containerlast.innerHTML = `${Math.ceil(results / options.itemsPerPage)}`;
    containerfirst.innerHTML = '1';

    pagination.on('afterMove', function (eventData) {

      theMovieById.page = eventData.page;

      galleryEl.innerHTML = createCardById(data);
       
    });
  } catch (error) {
    console.log(error.message);
  }
}


