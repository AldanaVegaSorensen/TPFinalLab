const router = require("express").Router();
const controller = require("../controllers/review.controller");
const authMiddleware = require("../middleware/auth.middleware")

router.post("/", authMiddleware, controller.createReview);
router.get("/movie/:id", controller.getReviewsByMovie);

module.exports = router;