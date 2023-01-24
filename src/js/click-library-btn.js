'use strict';

import { ThemoviedbAPI } from './api';
import { createCardInfo } from './card-info';
import localStorageService from './localstorage.js';
import { showLoader, hideLoader } from './loaders';


const libraryBtn = document.querySelector('.side-nav__link .link-current');
console.log(libraryBtn)