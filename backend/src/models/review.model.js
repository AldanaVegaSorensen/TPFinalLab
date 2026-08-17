const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/reviews.json');

function readReviews() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function writeReviews(reviews) {
  fs.writeFileSync(filePath,JSON.stringify(reviews, null, 2));
}

const ReviewModel = {
  async create(userId, movieId, rating, comment) {
    const reviews = readReviews();

    const newReview = {
      id: reviews.length ? reviews[reviews.length - 1].id + 1 : 1,
      user_id: userId,
      movie_id: movieId,
      rating,
      comment,
      created_at: new Date().toISOString(),
    };

    reviews.push(newReview);
    writeReviews(reviews);

    return newReview;
  },

  async findByMovie(movieId) {
    const reviews = readReviews();
    return reviews.filter((review) => review.movie_id === movieId);
  },
};

module.exports = ReviewModel;