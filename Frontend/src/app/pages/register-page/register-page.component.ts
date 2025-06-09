import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule,
            CommonModule
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent implements OnInit{

  errorMessage: string='';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  
  registerForm!:FormGroup;

  // Initialisation du composant
  ngOnInit(): void {

    /**
    * Initialisation du formulaire d'inscription avec validation des champs.
    * - email : champ obligatoire et doit être au format email valide.
    * - password : champ obligatoire.
    */
    this.registerForm=this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password :['', Validators.required]
    })
  }

  /**
 * Méthode appelée à la soumission du formulaire d'inscription.
 * Si le formulaire est valide, envoie les données au service d'authentification.
 * Gère la navigation et les erreurs en fonction de la réponse.
 */
  onRegister(){
    if (this.registerForm.valid) {
    console.log('Formulaire valide');
    const data = this.registerForm.value;
    this.authService.register(data).subscribe({
      next: (res) => {
        console.log('Inscription réussie :', res);
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        console.error('Erreur lors de l’inscription :', err);
      }
    });
  } 
  }

}
