import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReplaceComma } from '../_shared/pipes/replace-comma.pipe';
import { StarRatingComponent } from '../_shared/components/star-rating/star-taring.component';



@NgModule({
  declarations: [
    StarRatingComponent,
    ReplaceComma
  ],
  imports: [
    CommonModule
  ],
  exports : [
    CommonModule, /*module qui permet d'avoir accès aux directives tel que ngIf ou ngFor dans tous les sous modules*/
    FormsModule,
    ReactiveFormsModule, 
    StarRatingComponent,
    ReplaceComma
  ]
})
export class SharedModule { }
