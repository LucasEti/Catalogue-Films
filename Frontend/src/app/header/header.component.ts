import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  searchTerm : string='';

  constructor(private searchService: SearchService, private authService: AuthService) {}

  /**
 * Méthode appelée à chaque changement dans le champ de recherche.
 * Met à jour le terme de recherche dans le service de recherche.
 *
 * @returns {void}
 */
  onSearchChange() {
    this.searchService.setSearchTerm(this.searchTerm);
  }

  /**
 * Déconnecte l'utilisateur en appelant le service d'authentification.
 *
 * @returns {void}
 */
  logout() {
    this.authService.logout();
  }
  
}
