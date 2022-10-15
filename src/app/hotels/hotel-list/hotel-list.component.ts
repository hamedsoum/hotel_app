import { Component, OnInit } from "@angular/core";
import { map, Observable, of, catchError, EMPTY, combineLatest, forkJoin, withLatestFrom,Subject, BehaviorSubject  } from "rxjs";
import { IHotel} from "../shared/models/hotel"
import { hotelListService } from "../shared/services/hotel-list.service";
@Component({
    selector : 'app-hotel-list',
    templateUrl: './hotel-list.component.html',
    styleUrls : ['./hotel-list.component.css']
})


export class HotelListComponent implements OnInit{

      private _hotelFilter = 'mot';

      public filteredHotels: IHotel[] = [];

      public filteredHotels$ : Observable<IHotel[]> = of([]);
      public filterSubject : Subject<string> = new BehaviorSubject<string>(' ');


      public title = 'Liste hotel';

      public hotels : IHotel [] = [];

      public hotels$ : Observable<IHotel[]> = of([]);


      public receivedRating! : string;
  
      public showBadge : boolean = true ;

      public errMsg! : string;

      constructor(private hotelService : hotelListService){

      }
      ngOnInit(): void {

            const subject = new Subject<number>();

            subject.subscribe( {
                        next : (value) => console.log('A ', value) 
                    }        
            )

            subject.subscribe({
                  next : (value) => console.log('B ', value)     
            }
            )

            // const a$ = of(1,2,3)
            // const b$ = of(11,12,13)
            // const c$ = of(21,22,23)

            // combineLatest([a$, b$, c$]).subscribe((val) => console.log('combineLatest', val))
            // forkJoin([a$, b$, c$]).subscribe((val) => console.log('forkJoin', val))

            // a$.pipe(
            //       withLatestFrom(b$, c$))
            //       .subscribe((val) => console.log('with latest from', val)
            // )
            this.hotels$ = this.hotelService.hotelsWithCategories$.pipe(
                  catchError((err) => {
                        this.errMsg = err;

                        return EMPTY;
                  })
            );
            
            // this.filteredHotels$ = this.hotels$; 
            this.filteredHotels$ = this.createFilterHotels(this.filterSubject, this.hotels$);            
           
            this.hotelFilter = '';
           this.hotelService.gethotels().subscribe({
            next : hotels => {
                  this.hotels = hotels;
                  console.log(this.hotels);
                  
                  this.filteredHotels = this.hotels;
                  console.log(this.hotels);
                  
            },
            error : err => {
                  this.errMsg = err;
                  console.error(this.errMsg);
            } 
           });


      }

      public filterChange(value : string) : void  {
            console.log('value', value);
            this.filterSubject.next(value);
    }

    /**
     * The function is called toggleIsNewBadge(). It toggles the value of the showBadge variable
     * between true and false to show or hidden the bagde with target "new"
     */
      public toggleIsNewBadge(): void {
            this.showBadge = !this.showBadge;
      }
      
     /**
      * It returns the value of the private variable _hotelFilter.
      * @returns The value of the private variable _hotelFilter.
      */
      public get hotelFilter(): string {
            return this._hotelFilter;
      }

  /**
   * The function takes a string as an argument, and then sets the value of the private variable
   * _hotelFilter to the value of the argument
   * @param {string} filter - The filter string that the user has entered.
   */
      // public set hotelFilter(filter : string){
      //       this._hotelFilter = filter;

      //       this.filteredHotels = this.hotelFilter ? this.filterHotels(this.hotelFilter) : this.hotels;
      // }

      public set hotelFilter(filter : string){
            this._hotelFilter = filter;

            // if (this.hotelFilter) {
            //     this.filteredHotels$ = this.hotels$.pipe(
            //           map((hotels : IHotel[]) => this.filterHotels(filter, hotels ))
            //     )  
            // }else{
            //       this.filteredHotels$ = this.hotels$;
            // }

            // this.filteredHotels = this.hotelFilter ? this.filterHotels(this.hotelFilter) : this.hotels;
      }

      public createFilterHotels(filter$ : Observable<string>, hotels$ : Observable<IHotel[]>): Observable<IHotel[]>{
            return combineLatest(hotels$, filter$, (hotels : IHotel[], filter : string) =>{
                  if (filter === '') return hotels;

                  return hotels.filter(
                        (hotel : IHotel) => hotel.hotelName?.toLocaleLowerCase().indexOf(filter) !== -1
                   );
            });
      }



    /**
     * It takes a string as an argument and returns an array of hotels whose name contains the string
     * @param {string} criteria - The search criteria entered by the user.
     * @returns An array of hotels that match the criteria.
     */
      // private filterHotels(criteria : string): IHotel[]{
      //       criteria = criteria.toLocaleLowerCase();

      //       const res = this.hotels.filter(
      //             (hotel : IHotel) => hotel.hotelName?.toLocaleLowerCase().indexOf(criteria) !== -1
      //       );
      //       return res;
      // }

      private filterHotels(criteria : string, hotels : IHotel[]): IHotel[]{
            criteria = criteria.toLocaleLowerCase();

            const res = hotels.filter(
                  (hotel : IHotel) => hotel.hotelName?.toLocaleLowerCase().indexOf(criteria) !== -1
            );
            return res;
      }

      public receiveRatingClicked(message : string): void{
            this.receivedRating = message;
      }

     
}