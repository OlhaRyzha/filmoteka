'use strict';

export function createFilmCards(films) {
//   const { poster_path, title, release_date, vote_average
//  } = films;

  return films
    .map((film, idx) => {
      return `
        <li class="film-card__item">
            <img src="https://image.tmdb.org/t/p/w300${film.poster_path}" alt="${
        film.title + 'poster'
      }" class="film-card__poster" />
            <div class="film-card__content">
                <h2 class="film-card__title">${film.title}</h2>
                <p class="film-card__genre">${
                  film.genreNames.length > 3
                    ? film.genreNames.slice(0, 2) +
                      `<span data-id="${idx}" class="js-other-films">Other</span>`
                    : film.genreNames
                }
                    <span class="film-card__release-date">${(film.release_date).slice(0,4)}</span>
                    <span class="film-card__rating">${(film.vote_average).toFixed(1)}</span>
                </p>
            </div>
        </li>
      `;
    })
    .join('');
}
