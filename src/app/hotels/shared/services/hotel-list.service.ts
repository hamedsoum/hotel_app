import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { IHotel } from "../models/hotel";

@Injectable({
        providedIn : 'root'
    })
export class hotelListService {

    private readonly HOTEL_API_URL  = 'api/hotel.json';
    constructor(private http : HttpClient){
        
    }

    public gethotels(): Observable<IHotel[] >{
        return this.http.get<IHotel[]>(this.HOTEL_API_URL).pipe(
            tap(hotel => console.log('hotels' ,hotel),
            catchError(this.handleError)
            )
        );
    }

    public getHotelById(id : number):Observable<IHotel | undefined> | undefined{
      if (id === 0 ) {
        return of(this.getDefaultHotel())
      }
      return this.gethotels().pipe(
        map(hotels => hotels.find(hotel => hotel.hotelId === id))
      );
    }


public getDefaultHotel() : IHotel{
  return {
    hotelId : 0,
    hotelName : '',
    description : '',
    price : 0,
    rating : 0,
    imageUrl : '',
    category : ''

  }
}

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }
}