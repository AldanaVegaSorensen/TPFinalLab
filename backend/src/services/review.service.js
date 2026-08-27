const ReviewModel = require('../models/review.model');

const ReviewService = {

  async createReview(userId, movieId, rating, comment) {
    return await ReviewModel.create(userId, movieId, rating, comment);
  },

  async getReviewsByMovie(movieId) {
    return await ReviewModel.findByMovie(movieId);
  },

  async updateReview(id, userId, rating, comment){
  const review = await ReviewModel.findById(id);

  if (!review) {
    const error = new Error("Review no encontrada");
    error.status = 404;
    throw error;
  }

  if (review.user_id !== userId) {
    const error = new Error("No tenés permiso para modificar esta review");
    error.status = 403;
    throw error;
  }

  return await ReviewModel.update(id, {
    rating,
    comment
  })
},

async deleteReview(id, userId){
  const review = await ReviewModel.findById(id);

  if (!review) {
    const error = new Error("Review no encontrada");
    error.status = 404;
    throw error;
  }

  if (review.user_id !== userId) {
    const error = new Error("No tenés permiso para eliminar esta review");
    error.status = 403;
    throw error;
  }

  return ReviewModel.delete(id);
}


};

module.exports = ReviewService;