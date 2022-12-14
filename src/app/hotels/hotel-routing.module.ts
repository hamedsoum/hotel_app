import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelDetailGuard } from './shared/guards/hotel-detail.guard';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { HotelEditGuard } from './shared/guards/hotel-edit.guard';
import { HotleListGuard } from './shared/guards/hotle-list.guard';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path : 'hotel/:id', component : HotelDetailComponent,
      // canActivate: [HotelDetailGuard]
    },
      {path : 'hotels', 
      component : HotelListComponent
      // canActivate : [HotleListGuard]
    },
      {path : 'hotels/:id/edit', 
      component : HotelEditComponent,
      canDeactivate : [HotelEditGuard],
      // canActivate : [HotleListGuard]
    },

    ]),

  ],
  exports :[
    RouterModule
  ]
})
export class HotelRoutingModule { }
