const reviewService = require("../services/review.service");

async function createReview(req, res){
    try {

        const { movieId, rating, comment } = req.body;

        const userId = req.user.id;

        const review = await ReviewService.createReview(userId, movieId, rating, comment);

        res.status(201).json(review);

    } catch (error) {
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