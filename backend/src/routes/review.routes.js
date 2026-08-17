const router = require("express").Router();
const controller = require("../controllers/review.controller");

router.post('/', controller.createReview);//Crear review
router.get('/movie/:id', controller.getReviewsByMovie);//obtener review por pelicula

module.exports = router;