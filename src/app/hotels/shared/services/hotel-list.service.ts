import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Category } from "../models/category";

import { IHotel } from "../models/hotel";

@Injectable({
        providedIn : 'root'
    })
export class hotelListService {

    private readonly HOTEL_API_URL  = 'api/hotels';
    constructor(private http : HttpClient){
    }

    public gethotels(): Observable<IHotel[]>{
        return this.http.get<any>(this.HOTEL_API_URL).pipe(
          map((hotels : IHotel[]) => hotels.map(hotel  => ({
              ... hotel,
              price : hotel.price ? hotel.price * 1.5 : null
          }) as IHotel)
          ),
          tap(hotels => console.log('hotel', hotels)),
            catchError(this.handleError)
            )
    }

    public getHotelById(id : number):Observable<IHotel | undefined> | undefined{
      if (id === 0 ) {
        return of(this.getDefaultHotel())
      }
      return this.gethotels().pipe(
        map(hotels => hotels.find((hotel : any) => hotel.id === id))
      );
    }

    public updateHotel(hotel : IHotel): Observable<IHotel>{
      console.log(hotel);
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
    id : null,
    hotelName : null,
    description : null,
    price : null,
    rating : null,
    imageUrl : null,
    categoryId : null,
    category : null

  }
}

public getCategories (): Observable<Category[]>{
  return of([
    {
    id : 0,
    name : 'Motel',
    },
    {
    id : 0,
    name : 'Auberge',
    }
  ])
}

    private handleError(error: HttpErrorResponse) {
      let errorMessage! : string;
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
          errorMessage = `An error occured: ${error.error.message}`
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
            errorMessage =  `Backend returned code ${error.status},` +
            ` body was: , ${error.error}`;

        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }
}