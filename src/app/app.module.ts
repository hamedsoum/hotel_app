import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HighlightDirective } from './highlight.directive';
import { BadgeDirective } from './hotel-list/badge.directive';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule} from '@angular/common/http'
import { RouterModule } from '@angular/router';

import localeFr from "@angular/common/locales/fr"
import { ReplaceComma } from './_shared/pipes/replace-comma.pipe';
import { StarRatingComponent } from './_shared/components/star-rating/star-taring.component';
import { HomeComponent } from './home/home.component';
import { HotelDetailComponent } from './hotel-list/hotel-detail/hotel-detail.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HotelListComponent,
    HighlightDirective,
    BadgeDirective,
    ReplaceComma,
    StarRatingComponent,
    HomeComponent,
    HotelDetailComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path : 'home', component : HomeComponent},
      {path : '', redirectTo: 'home', pathMatch: 'full'},
      {path : 'hotel/:id', component : HotelDetailComponent},
      {path : 'hotels', component : HotelListComponent},
      {path : '**', redirectTo: 'home', pathMatch:'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
