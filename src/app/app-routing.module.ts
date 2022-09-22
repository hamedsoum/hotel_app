import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [

  {path : 'home', component : HomeComponent},
  {path : '', redirectTo: 'home', pathMatch: 'full'},
  {
    path : 'auth',
    loadChildren : () => import('./authentification/authentification.module').then(m => m.AuthentificationModule)
  },
  {path : '**', redirectTo: 'home', pathMatch:'full' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
