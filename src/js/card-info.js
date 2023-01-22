'use strict';

export function createCardInfo(info) {
  const {
    poster_path,
    title,
    overview,
    popularity,
    original_title,
    genres,
    vote_average,
    vote_count,
  } = info;

  const genreArr = [];
  genres.map(el => {
    genreArr.push(el.name);
  });

  const genreString = genreArr.join(', ');

  return `<div class="modal-card__poster">
                <img src="${
                  'https://image.tmdb.org/t/p/original' + poster_path
                }" alt="${title + 'poster'}">
            </div>
            <div class="modal-card__text">
                <h2 class="modal-card__title">${title}</h2>
                <div class="modal-card__info">
                    <ul class="modal-card__info-title-list">
                    <li class="modal-card__info-title-items modal-card__info-title-items__vote">Vote / Votes
                            <div class="modal-card__info-title-vote">
                                <div>${vote_average.toFixed(1)}</div>
                                <p>/ ${vote_count}</p>
                            </div>
                        </li>
                        <li class="modal-card__info-title-items modal-card__info-title-items__popularity">Popularity <p>
                                ${popularity.toFixed(1)}</p>
                        </li>
                        <li class="modal-card__info-title-items modal-card__info-title-items__original">Original Title
                            <p>${original_title}</p>
                        </li>
                        <li class="modal-card__info-title-items modal-card__info-title-items__genre">Genre <p>${genreString}
                            </p>
                        </li>
                    </ul>
                </div>
                <h3 class="modal-card__about-title">About</h3>
                <p class="modal-card__about-descr">${overview}</p>
                <div class="modal-card__buttons">
                    <button class="modal-card__watch-btn">add to Watched</button>
                    <button class="modal-card__queue-btn">add to queue</button>
                </div>
            </div>
            </div>`;
}
