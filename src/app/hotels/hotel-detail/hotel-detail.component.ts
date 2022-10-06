import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IHotel } from '../shared/models/hotel';
import { hotelListService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  // public hotel : IHotel | undefined = <IHotel>{};

  public hotel$ : Observable<IHotel | undefined> = of(<IHotel >{});

  constructor(
              private route : ActivatedRoute,

              private hotelService : hotelListService,

              private router : Router
              ) { }

  ngOnInit(): void {
    const id : number | null  = Number(this.route.snapshot.paramMap.get('id'));

   
    this.hotel$ = this.hotelService.gethotels()
    .pipe(
      map((hotels : IHotel[]) => hotels.find(hotel => hotel.id === id)),
      tap((item : IHotel | undefined) => console.log)
    )


    // .subscribe((hotel : IHotel | undefined) => {      
    //     this.hotel = hotel;
    //     console.log('id :', this.hotel);
    // }
    // ) 
   
  }


  public backToList() : void {
    this.router.navigate(['/hotels']);
  }

}
