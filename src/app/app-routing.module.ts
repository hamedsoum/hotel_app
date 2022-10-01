import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './authentification/login/login.component';

const routes: Routes = [

  {path : 'auth/login', component : LoginComponent},
  {path : '', redirectTo: 'auth/login', pathMatch: 'full'},
  {
    path : 'auth',
    loadChildren : () => import('./authentification/authentification.module').then(m => m.AuthentificationModule)
  },
  {
    path : 'user',
    loadChildren : () => import('./user/user.module').then(m => m.UserModule)
  },
  {path : '**', redirectTo: 'home', pathMatch:'full' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
