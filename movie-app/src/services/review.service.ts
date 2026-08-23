import api from "./api";

export const reviewService = {

    getByMovie: (movieId: number) => {
        return api.get(`/reviews/movie/${movieId}`);
    },

    create: (data: {
        movieId: number;
        rating: number;
        comment: string;
    }) => {
        return api.post("/reviews", data);
    },

};