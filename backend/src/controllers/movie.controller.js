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

async function byId(req, res) {
  try {
    const { id } = req.params;

    console.log("ID recibido:",id)

    const movie = await movieService.getMovieById(id);

    console.log("2. Movie obtenida:", movie);

    res.json(movie);

    console.log("3. Respuesta enviada");

  } catch (err) {
    console.log("4. Entró al catch");
    console.error("ERROR:", err);

    res.status(500).json({
      error: "No se pudo obtener la película.",
    });
  }
}




module.exports = {
    popular,
    topRated,
    upcoming,
    byGenre,
    nowPlaying,
    byId,
};