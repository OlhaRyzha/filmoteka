import axios from 'axios';

export class ThemoviedbAPI {
  static BASE_URL = 'https://api.themoviedb.org/3';
  static API_KEY = 'f2a6d17811dc6597e4e94000fd1f12ef';

  constructor() {
    axios.defaults.baseURL = ThemoviedbAPI.BASE_URL;
    this.query = null;
    this.page = 1;


  }



  async fetchFilmByQuery() {
    try {
      await this.fetchGenresMovieList();
      const response = await axios.get('/search/movie', {
        params: {
          api_key: ThemoviedbAPI.API_KEY,
          query: this.query,
          page: this.page,
          //   per_page: this.per_page,
        },
      });

      const {
        data
      } = response;


      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async fetchGenresMovieList() {
    if (this.genresObject !== undefined) {
      return
    }
    try {
      const response = await axios.get('/genre/movie/list', {
        params: {
          api_key: ThemoviedbAPI.API_KEY,
          language: 'en-US',
        },
      });

      const {
        genres
      } = response.data;
      // console.log(genres);

      this.genresObject = genres.reduce((acum, {
        id,
        name
      }) => ({
        ...acum,
        [id]: name
      }), {});

      localStorage.setItem('genre', JSON.stringify(genres));
      return genres;
    } catch (err) {
      console.log(err);
    }
  }

  async fetchTrendMovies() {
    try {
      await this.fetchGenresMovieList();

      const {
        data
      } = await axios.get('/trending/movie/day', {
        params: {
          api_key: ThemoviedbAPI.API_KEY,
          page: this.page,
        },
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }


  async fetchFilmInfo(id) {
    try {
    
      await this.fetchGenresMovieList();
      const response = await axios.get(`/movie/${id}`, {
        params: {
          api_key: ThemoviedbAPI.API_KEY,
          language: 'en-US',
        },
      });
      const {
        data
      } = response;

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  ///var 1
  // async fetchTrailer(id) {
  //   try {
  //     const response = await axios.get(`/movie/${id}/videos`, {
  //       params: {
  //         api_key: ThemoviedbAPI.API_KEY,
  //         language: 'en-US',
  //       },
  //     });
  //     const {
  //       data
  //     } = response;

  //     return data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  ///var 2
  async fetchTrailer(id) {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=f2a6d17811dc6597e4e94000fd1f12ef&language=en-US`;
      const response = await fetch(url);
      const data = response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}