import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-log-page',
  standalone: true,
  imports: [ReactiveFormsModule,
            CommonModule
            
  ],
  templateUrl: './log-page.component.html',
  styleUrl: './log-page.component.scss'
})
export class LogPageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  loginForm!: FormGroup;
  errorMessage: string='';

  // Initialisation du composant
  ngOnInit():void{
  
  /**
  * Initialisation du formulaire de connexion avec validation des champs.
  * - email : champ obligatoire et doit être au format email valide.
  * - password : champ obligatoire.
  */
  this.loginForm=this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  }

  /**
 * Méthode appelée à la soumission du formulaire de connexion.
 * Vérifie la validité du formulaire, appelle le service d'authentification,
 * gère la navigation en cas de succès, et affiche un message d'erreur en cas d'échec.
 */
  onLogin() {
  if (this.loginForm.valid) {
    const credentials = this.loginForm.value;

    this.authService.login(credentials).pipe(
      tap(() => {
        console.log('Connexion réussie !');
        this.router.navigate(['/home']); // redirection après succès
      }),
      catchError(err => {
        console.error('Erreur de connexion', err);
        this.errorMessage = 'Email ou mot de passe incorrect.';
        return of(null); // Empêche la casse du flux observable
      }),
    ).subscribe();
  }
}

  // Navigation vers la page de création d'un compte
  goToRegister() {
  this.router.navigate(['/register']);
}
}
