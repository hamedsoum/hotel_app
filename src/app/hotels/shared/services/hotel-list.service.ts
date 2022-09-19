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
        map(hotels => hotels.find(hotel => hotel.id === id))
      );
    }

    public updateHotel(hotel : IHotel): Observable<IHotel>{
      const url = `${this.HOTEL_API_URL}/${hotel.id}`;
      return this.http.put<IHotel>(url, hotel).pipe(
        catchError(this.handleError)
      )
    }

    public deleteHotel(id : number):Observable<{}>{
      const url = `${this.HOTEL_API_URL}/${id}`;
      return this.http.delete<{}>(url).pipe(
        catchError(this.handleError)
      )

    }

   public createHotel(hotel : IHotel): Observable<IHotel>{
    
    hotel = {
      ... hotel,
      imageUrl : 'assets/img/indoors.jpg',
      id : 0
    }
     return this.http.post<IHotel>(this.HOTEL_API_URL, hotel).pipe(
       catchError(this.handleError)
     )
   }

    // public getHotelById(id : number):Observable<IHotel | undefined> | undefined{
    //   const url = `${this.HOTEL_API_URL}/${id}`;

    //   if (id === 0 ) {
    //     return of(this.getDefaultHotel())
    //   }
    //   return this.http.get<IHotel>(url).pipe(
    //     catchError(this.handleError)
    //   )
    // }


public getDefaultHotel() : IHotel{
  return {
    id : 0,
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