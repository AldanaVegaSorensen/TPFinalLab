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

async function getMoviesByGenre(genreId) {
  const { data } = await api.get("/discover/movie", {
    params: {
      with_genres: genreId,
    },
  });

  return data.results;
}

async function getHomeMovies() {
  const genres = [
    { id: 28, title: "Acción" },
    { id: 35, title: "Comedia" },
    { id: 27, title: "Terror" },
    { id: 16, title: "Animación" },
  ];

  const [popular, upcoming] = await Promise.all([
    getPopularMovies(),
    getUpcomingMovies(),
  ]);

  const genreSections = await Promise.all(
    genres.map(async (genre) => ({
      type: "genre",
      title: genre.title,
      movies: await getMoviesByGenre(genre.id),
    }))
  );

  return [
    {
      type: "popular",
      title: "Populares",
      movies: popular,
    },

    {
      type: "upcoming",
      title: "Próximamente",
      movies: upcoming,
    },

    ...genreSections,
  ];
}

module.exports = {
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getMoviesByGenre,
    getHomeMovies,
};