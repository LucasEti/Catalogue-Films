export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
  tagline: string;
  status: string;
  original_language: string;
  homepage: string;
}

 