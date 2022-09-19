import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api'
import { Observable } from 'rxjs'
import { IHotel } from '../models/hotel'

export class HotelData implements InMemoryDbService {
    createDb(reqInfo?: RequestInfo): Record<string , IHotel[]> {
            const hotels : IHotel[] = [
                {
                    id: 1,
                    hotelName: "Buea sweet life",
                    description: "Beautiful view at the the sea side",
                    price: 230.5,
                    imageUrl: "assets/img/hotel-room.jpg",
                    rating: 3.5,
                    category : "nouveau",
                    tags : ["nouveau"]
              },
              {
                    id: 2,
                    hotelName: "Marakech",
                    description: "Enjoy the view of the mountains",
                    price: 145.5,
                    imageUrl: "assets/img/the-interior.jpg",
                    rating: 5,
                    category : "nouveau",
                    tags : ["nouveau"]
          
              },
              {
                    id: 3,
                    hotelName: "Abudja new look palace",
                    description: "Complete stay with car service",
                    price: 120.12,
                    imageUrl: "assets/img/indoors.jpg",
                    rating: 4,
                    category : "nouveau",
                    tags : ["nouveau"]
          
              },
              {
                    id: 4,
                    hotelName: "Cape town city",
                    description: "Beautiful setting for your stay",
                    price: 135.12,
                    imageUrl: "assets/img/window.jpg",
                    rating: 2.5,
                    category : "nouveau",
                    tags : ["nouveau"]
          
              }
            ];

            return  { hotels };
    }

    genId(hotels : IHotel[]) : number{
      return hotels.length > 0 ? Math.max(...hotels.map(hotel => hotel.id)) + 1 : 1;
    }
}