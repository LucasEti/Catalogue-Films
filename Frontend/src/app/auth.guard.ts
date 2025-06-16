import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  /**
   * Constructeur injectant les services nécessaires.
   *
   * @param {AuthService} auth - Service d'authentification pour vérifier si l'utilisateur est connecté
   * @param {Router} router - Service de navigation pour rediriger l'utilisateur
   */
  constructor(private auth: AuthService, private router: Router) {}


  /**
   * Vérifie si l'utilisateur peut accéder à une route protégée.
   * Si l'utilisateur est connecté (`isLoggedIn`), l'accès est autorisé.
   * Sinon, il est redirigé vers la page de connexion.
   *
   * @returns {boolean} `true` si l'accès est autorisé, `false` sinon
   */
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

