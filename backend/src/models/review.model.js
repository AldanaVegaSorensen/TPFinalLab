const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/reviews.json');
const UserModel = require("./user.model");

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
    console.log("Dentro del model");

    const reviewsData = readReviews();

    const reviews = reviewsData.filter(
        (review) =>
            Number(review.movie_id) === Number(movieId)
    );

    const reviewsWithUsers = await Promise.all(
        reviews.map(async (review) => {
            const user = await UserModel.findById(review.user_id);

            return {
                ...review,
                user: {
                    name: user ? user.name : "Usuario desconocido",
                },
            };
        })
    );

    console.log("Reseñas con usuarios:", reviewsWithUsers);

    return reviewsWithUsers.sort(
        (a, b) =>
            new Date(b.created_at) - new Date(a.created_at)
    );
  },
};

module.exports = ReviewModel;