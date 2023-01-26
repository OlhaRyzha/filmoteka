'use strict';
export function createFilmCards(films) {
  return films
    .map((film, idx) => {
      const { poster_path, title, release_date, vote_average, genreNames, id } =
        film;

      return `
        <li class="film-card__item" ${
          poster_path === null ? 'style = "position: relative;"' : ''
        }>
            <img src="${
              poster_path === null
                ? new URL('../images/black-poster.jpg', import.meta.url)
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
      `;
    })
    .join('');
}
