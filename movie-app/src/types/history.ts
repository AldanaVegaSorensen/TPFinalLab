export type HistoryMovie = {
    movie_id: number;
    watched_at: string;
}

export type History = {
    user_id: number;
    movies: HistoryMovie[];
}