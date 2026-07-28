import { Movie } from "./movie";

export interface HomeSection {
  type: string;
  title: string;
  movies: Movie[];
}