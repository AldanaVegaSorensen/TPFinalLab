const router = require("express").Router();
const controller = require("../controllers/movie.controller");

router.get("/", controller.getMovies);
router.get("/popular", controller.popular);
router.get("/top-rated", controller.topRated);
router.get("/upcoming", controller.upcoming);
router.get("/now-playing", controller.nowPlaying);
router.get("/search", controller.searchMovies);
router.get("/:id", controller.byId);

module.exports = router;