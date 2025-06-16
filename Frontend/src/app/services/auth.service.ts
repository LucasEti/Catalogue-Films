import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from "@angular/router";
import { AuthResponse } from "../models/AuthResponse.model";
import { User } from "../models/User.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';
  constructor(private http: HttpClient,private router: Router) {}

  /**
   * Envoie une requête de connexion au backend
   * @param credentials Objet contenant email et mot de passe
   */
  login(credentials: { email: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: AuthResponse) => {
        if (res.token) {
          localStorage.setItem('token', res.token); // Sauvegarde du token que serveur me renvoie
          localStorage.setItem('userId', res.userId); // Sauvegarde de l'id que serveur me renvoie
        }
      })
    );
  }

  /**
   * Envoie une requête d'inscription au backend
   * @param data Objet contenant email, mot de passe (et username si nécessaire)
   */
  register(data: { email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, data);
  }

  /**
   * Déconnecte l'utilisateur en supprimant le token
   */
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // Redirection vers la page de connexion
  }

  /**
   * Vérifie si l'utilisateur est connecté
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Récupère le token stocké
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }


}