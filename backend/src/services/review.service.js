const ReviewModel = require('../models/review.model');

const ReviewService = {

  async createReview(userId, movieId, rating, comment) {

    if (!rating || rating < 1 || rating > 5) {
      throw new Error('La valoración debe estar entre 1 y 5');
    }

    if (!comment || comment.trim().length === 0) {
      throw new Error('La review no puede estar vacía');
    }

    return await ReviewModel.create(userId, movieId, rating, comment );
  },

  async getReviewsByMovie(movieId) {
    return await ReviewModel.findByMovie(movieId);
  },

};

module.exports = ReviewService;