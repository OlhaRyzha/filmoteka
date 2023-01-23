import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { ThemoviedbAPI } from './api';
import { createFilmCards } from './film-card';
import Notiflix from 'notiflix';

const themoviedb = new ThemoviedbAPI();
const galleryEl = document.querySelector('.film-card__list');



const container = document.querySelector('#pagination');
 
export async function getPagination(){
  try{
    const {total_results} = await themoviedb.fetchTrendMovies();
    
    const options = {
      totalItems: total_results,
      itemsPerPage: 20,
      visiblePages: 5,
  
    }
    const pagination = new Pagination(container , options);


  }catch (error) {
        console.log(error.message);
      }
}


getPagination()










































