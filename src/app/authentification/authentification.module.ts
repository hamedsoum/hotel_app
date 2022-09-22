import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterReactiveFormComponent } from './register-reactive-form/register-reactive-form.component';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    RegisterReactiveFormComponent
  ],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthentificationModule { }
