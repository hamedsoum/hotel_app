import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule} from '@angular/common/http'
import { RouterModule } from '@angular/router';
import localeFr from "@angular/common/locales/fr"

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HotelsModule } from './hotels/hotels.module';
import { AuthentificationModule } from './authentification/authentification.module';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    HotelsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
