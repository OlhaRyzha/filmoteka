'use strict';

export function createFilmCards(films) {
  const { poster_path, title, release_date, vote_average } = films;

  return films
    .map((film, idx) => {
      return `
        <li class="film-card__item">
            <img src="${poster_path}" alt="${
        title + 'poster'
      }" class="film-card__poster" />
            <div class="film-card__content">
                <h2 class="film-card__title">${title}</h2>
                <p class="film-card__genre">${
                  film.genreNames.length > 2
                    ? film.genreNames.slice(0, 2) +
                      `<span data-id="${idx}" class="js-other-films">Other</span>`
                    : film.genreNames
                }
                    <span class="film-card__release-date">${release_date}</span>
                    <span class="film-card__rating">${vote_average}</span>
                </p>
            </div>
        </li>
      `;
    })
    .join('');
}
