import axios from 'axios';

export class ThemoviedbAPI {
  static BASE_URL = 'https://api.themoviedb.org/3';
  static API_KEY = 'f2a6d17811dc6597e4e94000fd1f12ef';

  constructor() {
    axios.defaults.baseURL = ThemoviedbAPI.BASE_URL;
    this.query = null;
    this.genres;
    this.fetchGenresMovieList();
    this.page = 1;
    // this.per_page = 40;
  }

  async fetchFilmByQuery() {
    try {
      const response = await axios.get('/search/movie', {
        params: {
          api_key: ThemoviedbAPI.API_KEY,
          query: this.query,
            page: this.page
          //   per_page: this.per_page,
        },
      });

      const { data } = response;
      console.log(data);

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async fetchGenresMovieList() {
    try {
      const response = await axios.get('/genre/movie/list', {
        params: {
          api_key: ThemoviedbAPI.API_KEY,
          language: 'en-US',
        },
      });
      
      const { genres } = response.data;
      // console.log(genres);
      this.genres = genres;

      return genres;
    } catch (err) {
      console.log(err);
    }
  }

  async fetchTrendMovies() {
    try {
      const { data } = await axios.get('/trending/movie/day', {
        params: {
          api_key: ThemoviedbAPI.API_KEY,
          page: this.page
        }
      });
      
      return data;
    } catch (err) {
      console.log(err);
    }
  }

}
