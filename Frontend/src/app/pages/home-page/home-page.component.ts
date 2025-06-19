import { Component } from '@angular/core';
import { TmdbService } from '../../services/ApiTMDB.service';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';
import { FavorisService } from '../../services/favoris.service';
import { FavorisComponent } from '../../favoris/favoris.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, FavorisComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  movies: any[] = [];
  private searchSub?: Subscription;

  constructor(private tmdbService: TmdbService,private searchService: SearchService,private favorisService: FavorisService, private router: Router) {}

  /**
   * Méthode appelée à l'initialisation du composant.
   * - Récupère les films populaires depuis l'API.
   * - S'abonne au champ de recherche pour filtrer les films dynamiquement.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.tmdbService.getPopularMovies().subscribe(data => {
      this.movies = data.results;
    });

    this.searchSub = this.searchService.searchTerm$.subscribe(term => {
      this.searchMovies(term);
    });
  }
  

  /**
   * Effectue une recherche de films si le terme est non vide, 
   * sinon récupère les films populaires par défaut.
   *
   * @param {string} term - Le terme de recherche saisi par l'utilisateur
   * @returns {void}
   */
  searchMovies(term: string) {
    if (term.trim()) {
      this.tmdbService.searchMovies(term).subscribe(data => {
        this.movies = data.results;
      });
    } else {
      this.tmdbService.getPopularMovies().subscribe(data => {
        this.movies = data.results;
      });
    }
  }

  /**
   * Ajoute un film donné aux favoris via le service Favoris.
   *
   * @param {any} movie - L'objet représentant le film à ajouter aux favoris
   * @returns {void}
   */
  ajouterAuxFavoris(movie: any) {
    this.favorisService.ajouterFavori(movie).subscribe({
      next: (film) => {
        console.log('Favori ajouté', film);        
      },
      error: (err) => {
        console.error('Erreur ajout favori', err);
      }
    });
  }

  /**
   * Méthode appelée lors de la destruction du composant.
   * Permet de se désabonner de la recherche pour éviter les fuites mémoire.
   *
   * @returns {void}
   */
  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }


  goToMovieDetails(movieId: number) {
    // Logique pour naviguer vers la page de détails du film
    this.router.navigate(['/movie', movieId]);
  }
}
