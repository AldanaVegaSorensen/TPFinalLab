const router = require("express").Router();
const controller = require("../controllers/movie.controller");

router.get("/popular", controller.popular);
router.get("/top-rated", controller.popular);
router.get("/upcoming", controller.popular);
router.get("/genre/:genreId", controller.byGenre);
router.get("/home", controller.home);

module.exports = router;