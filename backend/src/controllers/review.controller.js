const reviewService = require("../services/review.service");

async function createReview(req, res){
    try {

        const movieId = Number(req.body.movieId);
        const rating = Number(req.body.rating);
        const { comment } = req.body;

        if (!Number.isInteger(movieId) || movieId <= 0) {
            const error = new Error(
                "El ID de la película debe ser un número entero mayor que 0"
            );
            error.statusCode = 400;
            throw error;
        }

        if (!Number.isInteger(rating) || rating < 1 || rating > 10) {
            const error = new Error(
                "La valoración debe ser un número entero entre 1 y 10"
            );
            error.statusCode = 400;
            throw error;
        }

        if (typeof comment !== "string" || !comment.trim()) {
            const error = new Error(
                "El comentario es obligatorio"
            );
            error.statusCode = 400;
            throw error;
        }

        const review = await reviewService.createReview(req.user.userId, movieId, rating, comment);

        res.status(201).json(review);

    } catch (error) {
  console.error("Error completo creando review:", error);
  console.log(JSON.stringify(error, null, 2));
}
}

async function getReviewsByMovie(req, res){
  try {
    const { id } = req.params;


    const reviews = await reviewService.getReviewsByMovie(id);


    res.json(reviews);

  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

async function updateReview(req, res){
  try {
    const reviewId = Number(req.params.id);
    const { rating, comment } = req.body;

    if (!Number.isInteger(reviewId) || reviewId <= 0) {
            const error = new Error(
                "El ID de la película debe ser un número entero mayor que 0"
            );
            error.statusCode = 400;
            throw error;
        }

        if (!Number.isInteger(rating) || rating < 1 || rating > 10) {
            const error = new Error(
                "La valoración debe ser un número entero entre 1 y 10"
            );
            error.statusCode = 400;
            throw error;
        }

        if (typeof comment !== "string" || !comment.trim()) {
            const error = new Error(
                "El comentario es obligatorio"
            );
            error.statusCode = 400;
            throw error;
        }

    const updatedReview = await reviewService.updateReview(
      reviewId,
      req.user.userId,
      rating, 
      comment
    );

    console.log("Review editada")
    res.status(200).json(updatedReview);
  } catch (error) {
      res.status(400).json({
          message: error.message
      });
  }
};

async function deleteReview(req, res){
  try {
    const { id } = req.params;

    await reviewService.deleteReview(
      Number(id),
      req.user.userId
    );

    res.status(204).send();
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message
    });
  }
};

module.exports = {
  createReview,
  getReviewsByMovie,
  updateReview,
  deleteReview
};