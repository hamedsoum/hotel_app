import { Component } from "@angular/core";

@Component({
    selector : 'app-hotel-list',
    templateUrl: './hotel-list.component.html',
    styleUrls : ['./hotel-list.component.css']
})


export class HotelListComponent{
    public title = 'Liste hotel';

    public hotels : any [] = [
        {
              "hotelId": 1,
              "hotelName": "Buea sweet life",
              "description": "Beautiful view at the the sea side",
              "price": 230.5,
              "imageUrl": "assets/img/hotel-room.jpg",
              "rating": 3.5,
              "category" : "nouveau"
        },
        {
              "hotelId": 2,
              "hotelName": "Marakech",
              "description": "Enjoy the view of the mountains",
              "price": 145.5,
              "imageUrl": "assets/img/the-interior.jpg",
              "rating": 5,
              "category" : "nouveau"

        },
        {
              "hotelId": 3,
              "hotelName": "Abudja new look palace",
              "description": "Complete stay with car service",
              "price": 120.12,
              "imageUrl": "assets/img/indoors.jpg",
              "rating": 4,
              "category" : "nouveau"

        },
        {
              "hotelId": 4,
              "hotelName": "Cape town city",
              "description": "Beautiful setting for your stay",
              "price": 135.12,
              "imageUrl": "assets/img/window.jpg",
              "rating": 2.5,
              "category" : "nouveau"

        }
      ];

      public showBadge! : boolean ;

      public toggleIsNewBadge(): void {
            this.showBadge = !this.showBadge;
      }
      public hotelFilter = 'mot';
     
}