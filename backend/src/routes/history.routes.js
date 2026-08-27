const router = require("express").Router();

const controller = require("../controllers/history.controller");
const authMiddleware = require("../middleware/auth.middleware")

router.get("/", authMiddleware, controller.getHistory);
router.post("/", authMiddleware, controller.addMovie);
router.put("/:movieId", authMiddleware, controller.updateMovie);

module.exports = router;