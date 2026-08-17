export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
};

export type MovieDetails = Movie & {
  runtime: number;
  genres: {
    id: number;
    name: string;
  }[];
  origin_country: string[];
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
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