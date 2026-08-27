export type ReviewUser = {
  id: number;
  name: string;
};

export type Review = {
  id: number;
  movie_id: number;
  rating: number;
  comment: string;
  created_at: string;
  user: ReviewUser;
};