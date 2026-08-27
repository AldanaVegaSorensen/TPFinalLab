const router = require("express").Router();
const controller = require("../controllers/list.controller");
const authMiddleware = require("../middleware/auth.middleware")

router.post('/', authMiddleware, controller.createList);
router.get('/', authMiddleware, controller.getUserLists);
router.get('/:id', authMiddleware, controller.getById);
router.put('/:listId', authMiddleware, controller.updateList);
router.post('/:listId/movies', authMiddleware, controller.addMovie);
router.delete('/:listId/movies/:movieId', authMiddleware, controller.removeMovie);





module.exports = router;