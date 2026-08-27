const router = require("express").Router();
const controller = require("../controllers/review.controller");
const authMiddleware = require("../middleware/auth.middleware")

router.post("/", authMiddleware, controller.createReview);
router.get("/movie/:id", controller.getReviewsByMovie);
router.put("/:id", authMiddleware, controller.updateReview);
router.delete("/:id", authMiddleware, controller.deleteReview);
module.exports = router;