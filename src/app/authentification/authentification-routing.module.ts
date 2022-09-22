import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterReactiveFormComponent } from './register-reactive-form/register-reactive-form.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path : 'register', component : RegisterReactiveFormComponent},
  {path : 'login', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule { }
