const movieService = require("../services/movie.service");

async function popular(req, res) {
    try {

        const movies = await movieService.getPopularMovies();

        res.json(movies);

    } catch (err) {

        console.error(err);

        res.status(404).json({
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

        res.status(404).json({
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

        res.status(404).json({
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

        res.status(404).json({
            error: "No se pudieron obtener las películas."
        });

    }
}

async function byGenre(req, res) {
  try {
    const { genreId } = req.params;

    if (!Number.isInteger(genreId) || genreId <= 0) {
        const error = new Error("El ID de género no es válido");
        error.statusCode = 422;
        throw error;
    }

    const movies =
      await movieService.getMoviesByGenre(genreId);

    res.json(movies);

  } catch (err) {
    console.error(err);

    res.status(404).json({
      error: "No se pudieron obtener las películas.",
    });
  }
}

async function byId(req, res) {
  try {
    const { id } = req.params;

    const userId = Number(id);

    if (isNaN(userId)) {
    console.error("ID de usuario inválido");
    return;
    }


    const movie = await movieService.getMovieById(id);

    res.json(movie);

  } catch (err) {
    res.status(404).json({
      error: "No se pudo obtener la película.",
    });
  }
}

async function getMovies(req, res) {
    try {

        const cantidad = Number(req.query.cantidad) || 10;
        const from = Number(req.query.from) || 0;

        if (
            req.query.cantidad !== undefined &&
            (!Number.isInteger(cantidad) || cantidad <= 0)
        ) {
            return res.status(400).json({
                message: "cantidad debe ser un número entero mayor a 0"
            });
        }

        if (
            req.query.from !== undefined &&
            (!Number.isInteger(from) || from < 0)
        ) {
            return res.status(400).json({
                message: "from debe ser un número entero mayor o igual a 0"
            });
        }


        const movies = await movieService.getMovies(cantidad, from);

        res.json(movies);

    } catch (error) {
        console.error("Error obteniendo películas:", error);

        res.status(404).json({
            message: "Error al obtener las películas",
        });
    }
}


async function searchMovies(req, res) {
    try {
        const { query } = req.query;
        const page = Number(req.query.page) || 1;

        if (!query || !query.trim()) {
            return res.status(400).json({
                message: "La búsqueda es obligatoria",
            });
        }

        const movies = await movieService.searchMovies(
            query.trim(),
            page
        );

        res.status(200).json(movies);
    } catch (error) {
        console.error("Error buscando películas:", error);

        res.status(404).json({
            message: "Error al buscar películas",
        });
    }
};


module.exports = {
    popular,
    topRated,
    upcoming,
    byGenre,
    nowPlaying,
    byId,
    getMovies,
    searchMovies,
};