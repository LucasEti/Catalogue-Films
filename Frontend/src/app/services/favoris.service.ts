import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Film } from "../models/Film.model";


@Injectable({
  providedIn: "root",
})
export class FavorisService {
  /**
   * Sujet qui maintient en mémoire la liste actuelle des favoris côté client.
   */
    private favorisSubject = new BehaviorSubject<any[]>([]);
    private apiUrl = 'http://localhost:3000/api/favoris';

    /**
   * Observable permettant de s'abonner aux changements de la liste des favoris.
   */
    favoris$ = this.favorisSubject.asObservable();

    constructor(private http: HttpClient) {}

    /**
   * Ajoute un favori à la base de données via une requête POST,
   * puis met à jour localement la liste avec le nouveau favori.
   *
   * @param {any} favori - L'objet représentant le film à ajouter aux favoris
   * @returns {Observable<Film>} Un observable contenant le favori ajouté (réponse du backend)
   */
    ajouterFavori(favori: any): Observable<Film> {
      return this.http.post<Film>(this.apiUrl, favori).pipe(
        tap(nouveauFavori => {
          const currentFavoris = this.favorisSubject.value;
          this.favorisSubject.next([...currentFavoris, nouveauFavori]);
        })
      );
    }

    /**
   * Supprime un favori de la base de données via son identifiant,
   * puis met à jour localement la liste des favoris.
   *
   * @param {number} id - L'identifiant du favori à supprimer
   * @returns {Observable<Film>} Un observable indiquant le succès de la suppression
   */
    retirerFavori(id: number): Observable<Film> {
        return this.http.delete<Film>(`${this.apiUrl}/${id}`).pipe(
          tap(() => {
            const currentFavoris = this.favorisSubject.value;
            this.favorisSubject.next(currentFavoris.filter(f => f.id !== id));
          })
        );
      }

    /**
   * Récupère la liste complète des favoris depuis le backend
   * et met à jour le `BehaviorSubject` pour synchroniser l'état local.
   *
   * @returns {Observable<Film[]>} Un observable contenant la liste des favoris
   */
    getFavoris(): Observable<Film[]> {
        return this.http.get<Film[]>(this.apiUrl).pipe(
          tap(favoris => {
            this.favorisSubject.next(favoris); // synchronisation du BehaviorSubject
          })
        );
      }

}