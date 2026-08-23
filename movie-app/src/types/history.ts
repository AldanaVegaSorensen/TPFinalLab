export interface HistoryMovie {
    movie_id: number;
    watched_at: string;
}

export interface History {
    user_id: number;
    movies: HistoryMovie[];
}