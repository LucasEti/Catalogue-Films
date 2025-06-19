import { Component, OnInit } from '@angular/core';
import { FavorisService } from '../services/favoris.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoris',
  imports: [CommonModule],
  templateUrl: './favoris.component.html',
  styleUrl: './favoris.component.scss'
})
export class FavorisComponent implements OnInit {
  favoris: any[] = [];
  constructor(private favorisService: FavorisService, private router: Router) {}

  /**
   * Initialise le composant : 
   * - s'abonne au flux de favoris via le BehaviorSubject
   * - récupère les favoris depuis le backend et met à jour le sujet
   */
  ngOnInit(): void {
    this.favorisService.favoris$.subscribe(data => {
      this.favoris = data;
    });
    // Au chargement, récupérer la liste depuis le backend
    this.favorisService.getFavoris().subscribe(favs => {
      this.favorisService['favorisSubject'].next(favs); // met à jour le BehaviorSubject
    });
  }


  /**
   * Récupère la liste des favoris depuis le backend et l'assigne à la variable locale.
   * Affiche un message dans la console en cas de succès ou d'erreur.
   *
   * @returns {void}
   */
  recupererFavoris() {
    this.favorisService.getFavoris().subscribe({
      next: (data) => {
        this.favoris = data;
        console.log('Favoris récupérés avec succès', this.favoris);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des favoris', err);
      }
    });
  }  
  

  /**
   * Supprime un favori donné en fonction de son identifiant.
   * Met à jour localement la liste si la suppression réussit.
   *
   * @param {number} id - L'identifiant du favori à retirer
   * @returns {void}
   */
  retirerFavori(id: number) {
    this.favorisService.retirerFavori(id).subscribe({
      next: () => {
        console.log('Favori retiré avec succès');
        this.favoris = this.favoris.filter(favori => favori._id !== id);
      }
      ,
      error: (err) => {
        console.error('Erreur lors de la suppression du favori', err);
      }
    });
  }

  goToMovieDetails(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }

}
