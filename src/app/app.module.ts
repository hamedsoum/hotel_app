import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HighlightDirective } from './highlight.directive';
import { BadgeDirective } from './hotel-list/badge.directive';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';

import localeFr from "@angular/common/locales/fr"

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HotelListComponent,
    HighlightDirective,
    BadgeDirective
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
