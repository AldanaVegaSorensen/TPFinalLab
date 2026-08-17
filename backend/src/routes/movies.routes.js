const router = require("express").Router();
const controller = require("../controllers/movie.controller");

router.get("/popular", controller.popular);
router.get("/top-rated", controller.popular);
router.get("/upcoming", controller.popular);
router.get("/now-playing", controller.nowPlaying);
router.get("/genre/:genreId", controller.byGenre);
router.get("/:id", controller.byId);
router.get("/search", controller.searchMovies);
router.get("/", controller.getMovies);
module.exports = router;