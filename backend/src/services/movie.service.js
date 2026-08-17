const axios = require("axios");

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: process.env.TMDB_API_KEY,
        language: "es-AR"
    }
});

async function getPopularMovies() {
    const { data } = await api.get("/movie/popular");

    return data.results;
}

async function getTopRatedMovies() {
    const { data } = await api.get("/movie/top_rated");

    return data.results;
}

async function getUpcomingMovies() {
    const { data } = await api.get("/movie/upcoming");

    return data.results;
}

async function getNowPlayingMovies() {
    const { data } = await api.get("/movie/now_playing");

    return data.results;
}

async function getMoviesByGenre(genreId) {
  const { data } = await api.get("/discover/movie", {
    params: {
      with_genres: genreId,
    },
  });

  return data.results;
}


module.exports = {
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getMoviesByGenre,
    getNowPlayingMovies,
};