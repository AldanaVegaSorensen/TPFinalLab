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

async function getMovieById(id) {
  const { data } = await api.get(`/movie/${id}`,{
    params: {
        append_to_response: "credits",
    }
  });

  return data;
}


async function getMovies(cantidad = 10, from = 0) {

    const page = Math.floor(from / 20) + 1;

    const response = await api.get("/discover/movie", {
        params: {
            page,
            sort_by: "popularity.desc",
            include_adult: false,
        },
    });

    const movies = response.data.results;

    const start = from % 20;

    return {
        results: movies.slice(start, start + cantidad),
        total_results: response.data.total_results,
        cantidad,
        from
    };
}

async function searchMovies(query, page = 1){
    const response = await tmdb.get("/search/movie", {
        params: {
            query,
            page,
            include_adult: false,
        },
    });

    return response.data;
};


module.exports = {
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getMoviesByGenre,
    getNowPlayingMovies,
    getMovieById,
    getMovies,
    searchMovies,
};