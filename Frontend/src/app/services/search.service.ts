import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
    
  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  /**
   * Met à jour le terme de recherche dans le `BehaviorSubject`.
   * Cela déclenche la notification de tous les abonnés (composants ou services).
   *
   * @param {string} term - Le terme de recherche saisi par l'utilisateur
   * @returns {void}
   */
  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }
}

