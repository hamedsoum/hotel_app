import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector : 'app-star-rating',
    templateUrl : './star-rating.component.html',
    styleUrls : ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges{

    public starWidth! : number;

    @Input()
    public rating:number  = 2;
    
    
   /**
    * The ngOnChanges function is called whenever one of the input properties of the component changes
    * @param {SimpleChanges} changes - SimpleChanges
    */
    ngOnChanges(changes: SimpleChanges): void {
        console.log(this.rating);
        
        this.starWidth = this.rating * 125 / 5 ;
    }
}