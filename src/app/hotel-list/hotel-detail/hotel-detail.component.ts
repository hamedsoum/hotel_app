import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHotel } from '../hotel';
import { hotelListService } from '../hotel-list.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  public hotel : IHotel | undefined = <IHotel>{};

  constructor(
              private route : ActivatedRoute,
              private hotelService : hotelListService
              ) { }

  ngOnInit(): void {
    const id : number | null  = Number(this.route.snapshot.paramMap.get('id'));

    this.hotelService.gethotels().subscribe((hotels : IHotel[]) =>{      
        this.hotel = hotels.find(hotel => hotel.hotelId === id)
        console.log('id :', this.hotel);
    }
    )  
  }

}
