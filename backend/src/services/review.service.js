const ReviewModel = require('../models/review.model');

const ReviewService = {

  async createReview(userId, movieId, rating, comment) {
    return await ReviewModel.create(userId, movieId, rating, comment || "");
  },

  async getReviewsByMovie(movieId) {
    return await ReviewModel.findByMovie(movieId);
  },

};

module.exports = ReviewService;