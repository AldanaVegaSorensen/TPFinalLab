const movieService = require("../services/movie.service");

async function popular(req, res) {
    try {

        const movies = await movieService.getPopularMovies();

        res.json(movies);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "No se pudieron obtener las películas."
        });

    }
}

async function topRated(req, res) {
    try {

        const movies = await movieService.getTopRatedMovies();

        res.json(movies);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "No se pudieron obtener las películas."
        });

    }
}

async function upcoming(req, res) {
    try {

        const movies = await movieService.getUpcomingMovies();

        res.json(movies);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "No se pudieron obtener las películas."
        });

    }
}

async function nowPlaying(req, res) {
    try {

        const movies = await movieService.getNowPlayingMovies();

        res.json(movies);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "No se pudieron obtener las películas."
        });

    }
}

async function byGenre(req, res) {
  try {
    const { genreId } = req.params;

    const movies =
      await movieService.getMoviesByGenre(genreId);

    res.json(movies);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "No se pudieron obtener las películas.",
    });
  }
}




module.exports = {
    popular,
    topRated,
    upcoming,
    byGenre,
    nowPlaying,
};