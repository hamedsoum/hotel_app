import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
    selector : 'app-star-rating',
    templateUrl : './star-rating.component.html',
    styleUrls : ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges{

    public starWidth! : number;

    @Input()
    public rating:number  = 2;
    
    @Output()
    public starRatingClicked : EventEmitter<string> = new EventEmitter<string>();

    
   /**
    * The ngOnChanges function is called whenever one of the input properties of the component changes
    * @param {SimpleChanges} changes - SimpleChanges
    */
    ngOnChanges(changes: SimpleChanges): void {
        console.log(this.rating);
        
        this.starWidth = this.rating * 125 / 5 ;
    }

    public sendRating(): void {
        this.starRatingClicked.emit(`the rating of this hotel is ${this.rating}`)
    }
}