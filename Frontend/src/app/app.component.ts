import { Component,OnInit } from '@angular/core';
import { RouterModule,NavigationEnd,Router } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent,CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  showHeader = true;


  /**
   * Initialise le composant racine et écoute les changements de navigation
   * pour afficher ou masquer dynamiquement le header selon la route active.
   *
   * @param {Router} router - Le service de navigation Angular injecté pour surveiller les routes
   */
  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Liste des routes où on ne veut PAS afficher le header
      const hideHeaderRoutes = ['/login', '/register'];

      this.showHeader = !hideHeaderRoutes.includes(event.urlAfterRedirects);
    });
  }

  ngOnInit() {
    
  }


}
