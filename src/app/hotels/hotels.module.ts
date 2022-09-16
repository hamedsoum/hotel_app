import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { BadgeDirective } from './shared/directives/badge.directive';
import { HighlightDirective } from '../highlight.directive';
import { HotelDetailGuard } from './shared/guards/hotel-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { HotelRoutingModule } from './hotel-routing.module';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';



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
    HotelRoutingModule
  ]
})
export class HotelsModule { }
