import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotel } from '../shared/models/hotel';
import { hotelListService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit {

  public hotelForm! : FormGroup;

  public hotel! : IHotel;

  public pageTitle! : string ;
  constructor(
    private route : ActivatedRoute,
    private fb : FormBuilder,
    private hotelService : hotelListService,
    private router : Router
    ) { }


  ngOnInit(): void {
    this.hotelForm = this.fb.group({
      hotelName : ['', Validators.required],
      price : ['', Validators.required],
      rating: [''],
      description : [''],
      tags : this.fb.array([])
    });

    this.route.paramMap.subscribe(
      params => {
        const id = Number(params.get('id'));
        console.log(id);
        this.getSelectedHotel(id);
      }
    )
  }

  public get tags():FormArray {
    return this.hotelForm.get('tags') as FormArray;
  }

  public addTags(): void {
    this.tags.push(new FormControl())
  }
  public deleteTag(index : number){
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

public getSelectedHotel(id : number):void{
  this.hotelService.getHotelById(id)?.subscribe(
    (hotel : IHotel |undefined) => {
    this.displayHotel(hotel)      
    }
  )
}


public displayHotel(hotel : IHotel | undefined ){

 if (hotel) {
  this.hotel = hotel
 }
 if (this.hotel.id === 0) {
  this.pageTitle = 'Créer un hotel';
}else{
  this.pageTitle = `Modifier l\'hotel ${this.hotel.hotelName}`
}
  this.hotelForm.patchValue({
    hotelName : this.hotel.hotelName,
    price : this.hotel.price,
    rating : this.hotel.rating,
    description : this.hotel.description 
  })

  this.hotelForm.setControl('tags', this.fb.array(this.hotel.tags || []));
}
  public saveHotel() : void {
    if (this.hotelForm.valid) {
        if (this.hotelForm.dirty) {
          const hotel : IHotel = {
            ...this.hotel,
            ...this.hotelForm.value
          };

          if (this.hotel.id === 0  ) {
            this.hotelService.createHotel(this.hotel).subscribe(
              () => this.saveCompleted()
            )
          }else{
            this.hotelService.updateHotel(this.hotel).subscribe(
             () => this.saveCompleted()     
            )
          }
        }
    }
    console.log(this.hotelForm.value);
    
  }

  public deleteHotel(){
    if (confirm(`voulez vous réelement supprimer ${this.hotel.hotelName}`)) {
      this.hotelService.deleteHotel(this.hotel.id).subscribe(
        () => this.saveCompleted()
      )
    }
  }
  saveCompleted() {
    this.hotelForm.reset();
    this.router.navigate(['/hotels']);
    // this.router.navigateByUrl
  }
}
