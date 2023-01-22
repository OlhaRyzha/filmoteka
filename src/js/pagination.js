import { ThemoviedbAPI } from './api';
import { createFilmCards } from './film-card';
import Notiflix from 'notiflix';

const themoviedb = new ThemoviedbAPI();
const galleryEl = document.querySelector('.film-card__list');
const paginationList = document.querySelector('.pagination__list');
const pagination = document.querySelector('#pagination');



createPag(1);
export async function createPag(page) {
  let liTag = '';
  let activeLi;
  let beforePage = page - 1;
  let afterPage = page + 1;

  themoviedb.fetchTrendMovies().then(data => {
    let totalPage = data.total_pages;

    if (page > 1) {
      liTag += `<li class="pagination-arrow" data-index="${
        page - 1
      }"><svg class="pag-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M12.6666 8H3.33325"

      />
    <path
        d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337"

      />
    </svg></li>`;
    }

    if (page > 2) {
      liTag += `<li class="num hide" data-index="1">1</li>`;

      if (page > 3) {
        liTag += `<li class="dots"><span>. . .</span></li>`;

        if (page > 4) {
          beforePage -= 1;
        }
        afterPage += 1;
      }
    }

    if (page === totalPage) {
      beforePage -= 2;
    } else if (page === totalPage - 1) {
      beforePage -= 1;
    }

    if (page === 1) {
      afterPage += 2;
    } else if (page === 2) {
      afterPage += 1;
    }

    for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) {
      if (pageLength > totalPage) {
        continue;
      }
      if (pageLength === 0) {
        pageLength += 1;
      }

      if (page === pageLength) {
        activeLi = 'active';
      } else {
        activeLi = '';
      }

      liTag += `<li class="num ${activeLi}" data-index="${pageLength}">${pageLength}</li>`;
    }

    if (page < totalPage - 2) {
      if (page < totalPage - 2) {
        liTag += `<li ><span>. . .</span></li>`;
      }

      liTag += `<li class="num hide"  data-index="${totalPage}">${totalPage}</li>`;
    }

    if (page < totalPage) {
      liTag += `<li class="pagination-arrow"  data-index="${
        page + 1
      }"><svg class="pag-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.33341 8H12.6667"/>
    <path d="M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337" />
    </svg></li>`;
    }
    pagination.innerHTML = liTag;


  });
}


export async function switchesPages(e) {
  if (e.target.tagName !== 'LI') return;

  clearPage();

  themoviedb.page = +e.target.dataset.index;

await themoviedb.fetchTrendMovies().then(
    data => {
      
      updateDate(data);

      // updateGenres(data);
    
      updateRating(data);
      
   function updateDate(data) {
        data.results.map(el => {
          if (el.release_date === undefined) {
            return;
          }

          el.release_date = el.release_date.substring(0, 4);
        });
      
        return data;
      }
      
 function updateRating(data) {
        data.results.map(el => {
          if (el.vote_average < 10) {
            el.vote_average = String(el.vote_average).padEnd(3, `.0`);
          }
      
          if (el.vote_average >= 10) {
            el.vote_average = String(el.vote_average).padEnd(4, `.0`);
          }
        });
      
        return data;
      }
      
//  function updateGenres(data) {
//         const arrayGenres = JSON.parse(localStorage.getItem('genre'));
      
//         let id = [];
//         let name = [];
      
//         arrayGenres.forEach(el => {
//           id.push(el.id);
//           name.push(el.name);
//         });
      
//         data.results.map(el => {
//           el.genre_ids.map((element, index, arr) => {
//             const indexOf = id.indexOf(element);
      
//             element = name[indexOf];
      
//             arr.splice(index, 1, ` ${element}`);
//           })
//           if (el.genre_ids.length >= 3) {
//             el.genre_ids.splice(2, 100, ' Other');
//             return;
//           }
//         });
      
//         return data;
//       }
      


createPag(+e.target.dataset.index);

galleryEl.insertAdjacentHTML('beforeend', createFilmCards(data));
})
}

function clearPage() {
  galleryEl.innerHTML = '';
}







pagination.addEventListener('click', switchesPages);
