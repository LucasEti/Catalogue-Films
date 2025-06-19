import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { TmdbResponse } from '../models/TMDBresponse.model';
import { MovieDetail } from '../models/Movie-detail.model';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = '4f26410b4067b60c69e99b6cb575005f';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  
  /**
   * Récupère les films populaires depuis l'API TMDB.
   *
   * @returns {Observable<TmdbResponse>} Un observable contenant la réponse de l'API TMDB(liste de films populaires)
   */
  getPopularMovies(): Observable<TmdbResponse> {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=fr-FR&page=1`;
    return this.http.get<TmdbResponse>(url);
  }

  /**
   * Récupère les détails d'un film spécifique par son identifiant.
   *
   * @param {number} id - L'identifiant du film à récupérer
   * @returns {Observable<MovieDetail>} Un observable contenant les détails du film
   */
  getMovieDetails(id: number): Observable<MovieDetail> {
    const url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=fr-FR`;
    return this.http.get<MovieDetail>(url);
  }


  /**
   * Recherche des films par mot-clé dans l'API TMDB.
   *
   * @param {string} query - Le terme de recherche saisi par l'utilisateur
   * @returns {Observable<TmdbResponse>} Un observable contenant la réponse de l'API (résultats de la recherche)
   */
  searchMovies(query: string): Observable<TmdbResponse> {
  const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=fr-FR&query=${encodeURIComponent(query)}&page=1&include_adult=false`;
  return this.http.get<TmdbResponse>(url);
}

}