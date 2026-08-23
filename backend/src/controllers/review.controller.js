const reviewService = require("../services/review.service");

async function createReview(req, res){
    try {
        console.log("===== CREATE REVIEW =====");
        console.log("USER:", req.user);
        console.log("BODY:", req.body);

        const { movieId, rating, comment } = req.body;

        const userId = req.user.userId;

        console.log("userId:", userId);
        console.log("movieId:", movieId);
        console.log("rating:", rating);
        console.log("comment:", comment);


        const review = await reviewService.createReview(userId, movieId, rating, comment);

        console.log("REVIEW CREADA:", review);
        res.status(201).json(review);

    } catch (error) {
      console.error("ERROR CREATE REVIEW:", error);
        res.status(400).json({ message: error.message });
  }
}

const getReviewsByMovie = async (req, res) => {
  try {
    const { id } = req.params;


    const reviews = await reviewService.getReviewsByMovie(id);


    res.json(reviews);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createReview,
  getReviewsByMovie
};