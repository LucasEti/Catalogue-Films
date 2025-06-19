import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogPageComponent } from './pages/log-page/log-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './auth.guard';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';

export const routes: Routes = [
    { path: 'login', component: LogPageComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path:'register',component: RegisterPageComponent},
    { path : 'home', component:HomePageComponent, canActivate: [AuthGuard] },
    { path: 'movie/:id', component: MovieDetailsPageComponent, canActivate: [AuthGuard] }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}


