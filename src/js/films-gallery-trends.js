'use strict'
import { ThemoviedbAPI } from "./api";
import { createFilmCards } from "./film-card";

const themoviedb = new ThemoviedbAPI();
const galleryEl = document.querySelector('.film-card__list')

themoviedb.fetchTrendMovies()
.then((data) => {
//     const gen = (themoviedb.genres).reduce((acum, { id, name }) => ({
//         ...acum, [id]: name
//     }), {});
//     data.results.map(film => {
//     film.genreNames = film.genre_ids.map(genreId => {
//         return gen[genreId] || 'Unknown genre';
//     })
//  })
    data.results.forEach(film => {
        film.genreNames = film.genre_ids
        .map(filmID => 
                (themoviedb.genres).find(({ id }) => id === filmID)
            )
                .map(({ name }) => name)
    });

  galleryEl.insertAdjacentHTML("beforeend", createFilmCards(data.results))            
}).catch((err) => {
    console.log(err);
})


