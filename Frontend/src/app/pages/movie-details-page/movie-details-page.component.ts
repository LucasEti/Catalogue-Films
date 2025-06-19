import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../services/ApiTMDB.service';
import { MovieDetail } from '../../models/Movie-detail.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details-page',
  imports: [CommonModule],
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss'
})
export class MovieDetailsPageComponent implements OnInit {

      movie!:MovieDetail;
      genreList: string = '';

      /**
       * Constructeur du composant.
       * 
       * @param {TmdbService} tmdbService - Service pour interagir avec l'API TMDB.
       * @param {ActivatedRoute} route - Service pour accéder aux paramètres de la route (URL).
       */
      constructor(private tmdbService: TmdbService, private route: ActivatedRoute) {}

      
      /**
     * Méthode appelée lors de l'initialisation du composant.
     * Elle récupère l'id du film dans les paramètres de la route,
     * puis demande les détails du film via le service TMDB.
     * 
     * @returns {void}
     */
      ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        
        this.tmdbService.getMovieDetails(id).subscribe({
        next: (data) => {
          this.movie = data;
          this.genreList = this.movie.genres?.map(g => g.name).join(', ') || 'N/A';
        },
        error: (err) => {
          console.error('Erreur lors du chargement du film', err);
          this.genreList = 'N/A';
        }
      });
    }

}
