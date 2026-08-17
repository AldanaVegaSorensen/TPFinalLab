const movieService = require("./movie.service");


async function getHomeMovies() {

  const genres = [
    {
      id: "action",
      genreId: 28,
      title: "Acción"
    },
    {
      id: "comedy",
      genreId: 35,
      title: "Comedia"
    },
    {
      id: "horror",
      genreId: 27,
      title: "Terror"
    }
  ];


  const [
    popular,
    upcoming
  ] = await Promise.all([
    movieService.getPopularMovies(),
    movieService.getUpcomingMovies()
  ]);


  const genreSections = await Promise.all(
    genres.map(async (genre) => ({
      id: genre.id,
      type: "genre",
      title: genre.title,
      movies: await movieService.getMoviesByGenre(genre.genreId)
    }))
  );


  return [
    {
      id: "popular",
      type: "popular",
      title: "Populares",
      movies: popular
    },
    {
      id: "upcoming",
      type: "upcoming",
      title: "Próximamente",
      movies: upcoming
    },
    ...genreSections
  ];

}


module.exports = {
  getHomeMovies
};