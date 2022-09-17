import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IHotel } from '../shared/models/hotel';
import { hotelListService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit {

  public hotelForm! : FormGroup;

  public hotel! : IHotel;

  public pageTitle! : string ;
  constructor(
    private route : ActivatedRoute,
    private fb : FormBuilder,
    private hotelService : hotelListService
    ) { }


  ngOnInit(): void {
    this.hotelForm = this.fb.group({
      hotelName : ['', Validators.required],
      hotelPrice : ['', Validators.required],
      starRatign: [''],
      description : ['']
    });

    this.route.paramMap.subscribe(
      params => {
        const id = Number(params.get('id'));
        console.log(id);
        this.getSelectedHotel(id);
      }
    )
  }
public getSelectedHotel(id : number):void{
  this.hotelService.getHotelById(id)?.subscribe(
    (hotel : IHotel |undefined) => {
    this.displayHotel(hotel)      
    }
  )
}


public displayHotel(hotel : IHotel | undefined ){

 if (hotel) {
  this.hotel = hotel
 }
 if (this.hotel.hotelId === 0) {
  this.pageTitle = 'Créer un hotel';
}else{
  this.pageTitle = `Modifier l\'hotel ${this.hotel.hotelName}`
}
  this.hotelForm.patchValue({
    hotelName : this.hotel.hotelName,
    hotelPrice : this.hotel.price,
    starRatign : this.hotel.rating,
    description : this.hotel.description 
  })
}
  public saveHotel() : void {
    console.log(this.hotelForm.value);
    
  }
}
