import { Film } from "./Film.model";

export interface TmdbResponse {
  page: number;
  results: Film[];
  total_results: number;
  total_pages: number;
}