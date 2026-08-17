const homeService = require("../services/home.service");


async function getHome(req, res) {

  try {

    const sections = await homeService.getHomeMovies();

    res.json(sections);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al obtener home"
    });

  }

}


module.exports = {
  getHome
};