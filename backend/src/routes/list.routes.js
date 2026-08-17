const router = require("express").Router();
const controller = require("../controllers/list.controller");


router.post('/', controller.createList);

router.get('/', controller.getUserLists);

router.post('/:listId/movies', controller.addMovie);

router.delete('/:listId/movies/:movieId', controller.removeMovie);

module.exports = router;