'use strict';

export function createFilmCards(films) {
  return films
    .map((film, idx) => {
      const { poster_path, title, release_date, vote_average, genreNames } =
        film;

      return `
        <li class="film-card__item">
            <img src="${
              'https://image.tmdb.org/t/p/original' + poster_path
            }" alt="${title + ' poster'}" class="film-card__poster" />
            <div class="film-card__content">
                <h2 class="film-card__title">${title}</h2>
                <p class="film-card__genre">${
                  genreNames.length > 2
                    ? genreNames.slice(0, 2).join(', ') +
                      `<span data-id="${idx}" class="js-other-genres">, Other</span>`
                    : genreNames
                }
                    <span class="film-card__release-date">${
                      release_date === ''
                        ? ''
                        : new Date(release_date).getFullYear()
                    }
                    </span>
                    <span class="film-card__rating">${vote_average.toFixed(1)}
                    </span>
                </p>
            </div>
        </li>
      `;
    })
    .join('');
}
