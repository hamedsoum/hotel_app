import { NgModule } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { BadgeDirective } from './shared/directives/badge.directive';
import { HighlightDirective } from '../highlight.directive';
import { SharedModule } from '../shared/shared.module';
import { HotelRoutingModule } from './hotel-routing.module';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { HotelData } from './shared/api/hotel.data';



@NgModule({
  declarations: [
    HotelListComponent,
    HotelDetailComponent,
    BadgeDirective,
    HighlightDirective,
    HotelEditComponent
  ],
  imports: [
    SharedModule,
    HotelRoutingModule,
    // InMemoryWebApiModule.forFeature(HotelData)
  ]
})
export class HotelsModule { }
