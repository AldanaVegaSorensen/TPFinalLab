import api from "./api";

export const reviewService = {

    getByMovie: (movieId: number) => api.get(`/reviews/movie/${movieId}`),

    create: (data: { movieId: number, rating: number; comment: string;}) => api.post("/reviews", data),

    async update(id: number, rating: number, comment: string) {
        const { data } = await api.put(`/reviews/${id}`, {
            rating,
            comment,
        });

        return data;
    },

    async delete(id: number) { await api.delete(`/reviews/${id}`)},
    

};