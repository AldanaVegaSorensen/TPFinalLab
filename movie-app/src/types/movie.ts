export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type Credits = {
  cast: CastMember[];
  crew: CrewMember[];
};

export type MovieDetails = Movie & {
  runtime: number;
  genres: Genre[];
  origin_country: string[];
  credits: Credits;
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};


export type CrewMember = {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
};

export type MovieCategory =
  | "popular"
  | "top_rated"
  | "upcoming"
  | "now_playing";