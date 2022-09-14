import { Component, OnInit } from "@angular/core";
import { IHotel} from "./hotel"
@Component({
    selector : 'app-hotel-list',
    templateUrl: './hotel-list.component.html',
    styleUrls : ['./hotel-list.component.css']
})


export class HotelListComponent implements OnInit{

      private _hotelFilter = 'mot';

      public filteredHotels: IHotel[] = [];

      public title = 'Liste hotel';

      public hotels : IHotel [] = [
          {
                hotelId: 1,
                hotelName: "Buea sweet life",
                description: "Beautiful view at the the sea side",
                price: 230.5,
                imageUrl: "assets/img/hotel-room.jpg",
                rating: 3.5,
                category : "nouveau"
          },
          {
                hotelId: 2,
                hotelName: "Marakech",
                description: "Enjoy the view of the mountains",
                price: 145.5,
                imageUrl: "assets/img/the-interior.jpg",
                rating: 5,
                category : "nouveau"
  
          },
          {
                hotelId: 3,
                hotelName: "Abudja new look palace",
                description: "Complete stay with car service",
                price: 120.12,
                imageUrl: "assets/img/indoors.jpg",
                rating: 4,
                category : "nouveau"
  
          },
          {
                hotelId: 4,
                hotelName: "Cape town city",
                description: "Beautiful setting for your stay",
                price: 135.12,
                imageUrl: "assets/img/window.jpg",
                rating: 2.5,
                category : "nouveau"
  
          }
        ];
  
        public showBadge! : boolean ;
      ngOnInit(): void {
            this.filteredHotels = this.hotels;
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
     
}