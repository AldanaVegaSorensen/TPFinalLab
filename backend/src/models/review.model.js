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
      comment: comment,
      created_at: new Date().toISOString(),
    };

    reviews.push(newReview);
    writeReviews(reviews);

    return newReview;
  },

  async findByMovie(movieId) {

    const reviewsData = readReviews();

    const reviews = reviewsData.filter(
        (review) =>
            Number(review.movie_id) === Number(movieId)
    );

    const reviewsWithUsers = await Promise.all(
    reviews.map(async (review) => {
        const user = await UserModel.findById(review.user_id);

        return {
            id: review.id,
            movie_id: review.movie_id,
            rating: review.rating,
            comment: review.comment,
            created_at: review.created_at,
            user: {
                id: review.user_id,
                name: user ? user.name : "Usuario desconocido",
            },
        };
    })
);

    return reviewsWithUsers.sort(
        (a, b) =>
            new Date(b.created_at) - new Date(a.created_at)
    );
  },

  async update(id, data) {
    const reviews = readReviews();

    const review = reviews.find(
      (review) => review.id === id
    );
    if(!review){
      return null
    }

    review.rating=data.rating;
    review.comment=data.comment;


    writeReviews(reviews)

    return review;
  },

  async delete(id) {
  const reviews = readReviews();

  const index = reviews.findIndex(
    review => review.id === id
  );

  if (index === -1) {
    return null;
  }

  const deletedReview = reviews[index];

  reviews.splice(index, 1);

  writeReviews(reviews);

  return deletedReview;
},
async findById(id) {
    const reviews = readReviews()

    return reviews.find(review => review.id === Number(id));
}
};



module.exports = ReviewModel;