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

    //console.log("ID recibido:",id)

    const movie = await movieService.getMovieById(id);

    //console.log("2. Movie obtenida:", movie);

    res.json(movie);

    //console.log("3. Respuesta enviada");

  } catch (err) {
    //console.log("4. Entró al catch");
    //console.error("ERROR:", err);

    res.status(500).json({
      error: "No se pudo obtener la película.",
    });
  }
}

async function getMovies(req, res){
    try {
        console.log("Dentro del controller de movies obteniendo todas las peliculas: ")
        const page = Number(req.query.page) || 1;
        console.log("PAGINAS: ",page)

        const movies = await movieService.getMovies(page);
        console.log("Peliculas de la pagina ",page,": ",movies)

        res.json(movies);
    } catch (error) {
        console.error("Error obteniendo películas:", error);

        res.status(500).json({
            message: "Error al obtener las películas",
        });
    }
};


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

        res.status(500).json({
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