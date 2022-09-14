import { Component, OnInit } from "@angular/core";
import { IHotel} from "./hotel"
import { hotelListService } from "./hotel-list.service";
@Component({
    selector : 'app-hotel-list',
    templateUrl: './hotel-list.component.html',
    styleUrls : ['./hotel-list.component.css']
})


export class HotelListComponent implements OnInit{

      private _hotelFilter = 'mot';

      public filteredHotels: IHotel[] = [];

      public title = 'Liste hotel';

      public hotels : IHotel [] = [];

      public receivedRating! : string;
  
      public showBadge! : boolean ;

      public errMsg! : string;

      constructor(private hotelService : hotelListService){

      }
      ngOnInit(): void {

           this.hotelService.gethotels().subscribe({
            next : hotels => {
                  this.hotels = hotels;
                  this.filteredHotels = this.hotels;
            },
            error : err => this.errMsg = err
           });
            this.hotelFilter = '';
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
      public set hotelFilter(filter : string){
            this._hotelFilter = filter;

            this.filteredHotels = this.hotelFilter ? this.filterHotels(this.hotelFilter) : this.hotels;
      }

    /**
     * It takes a string as an argument and returns an array of hotels whose name contains the string
     * @param {string} criteria - The search criteria entered by the user.
     * @returns An array of hotels that match the criteria.
     */
      private filterHotels(criteria : string): IHotel[]{
            criteria = criteria.toLocaleLowerCase();

            const res = this.hotels.filter(
                  (hotel : IHotel) => hotel.hotelName.toLocaleLowerCase().indexOf(criteria) !== -1
            );
            return res;
      }

      public receiveRatingClicked(message : string): void{
            this.receivedRating = message;
      }
     
}