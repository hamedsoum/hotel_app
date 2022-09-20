import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounce, debounceTime, EMPTY, fromEvent, merge, Observable, timer } from 'rxjs';
import { IHotel } from '../shared/models/hotel';
import { hotelListService } from '../shared/services/hotel-list.service';
import { GlobalGenerateValidator } from '../shared/validators/global-generic.validator';
import { NumberValidators } from '../shared/validators/numbers.validator';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read : ElementRef}) inputElements! : ElementRef[];

  public hotelForm! : FormGroup;

  public hotel! : IHotel;

  public pageTitle! : string ;

  public errorMessage! : string;

  public formsErrors : {[key : string] : string} = {};

  private validatiomMessage : { [key : string] : { [key : string] : string } } = {
    hotelName : {
      required : 'Le nom de l\'hotel est obligatoire',
      minlength : 'Le nom de l\'hotel doit comporter au moins 4 caractères'
    },
    price : {
      required : 'Le prix de l\'hotel est obligatoire',
      pattern : 'Le prix de l\'hotel doit etre un nombre'
    },
    rating : {
      range : 'Donnez une note comprise entre 1 et 5'
    }
}

private globalGenericValidator! : GlobalGenerateValidator;

private isFormSubmitted : boolean = false;

  constructor(
    private route : ActivatedRoute,
    private fb : FormBuilder,
    private hotelService : hotelListService,
    private router : Router
    ) { }


  ngOnInit(): void {
    this.globalGenericValidator = new GlobalGenerateValidator(this.validatiomMessage);
    this.hotelForm = this.fb.group({
      hotelName : ['', [Validators.required, Validators.minLength(4)]],
      price : ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      rating: ['', NumberValidators.range(1, 5)],
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
    
    ngAfterViewInit(): void {
      const formControlBlurs : Observable<unknown>[] = this.inputElements
      .map((FormControlElementRef : ElementRef) => fromEvent(FormControlElementRef.nativeElement, 'blur'))
      
      merge(this.hotelForm.valueChanges, ...formControlBlurs)
      .pipe(
        //si on clique sur le boutton sauvegarder ne pas utiliser le debounce time sinon l'utiliser pour les autres
        // debounce(() => this.isFormSubmitted ? EMPTY : timer(800))
        debounceTime(500)
      )
      .subscribe(() => {
        this.formsErrors = this.globalGenericValidator.createErrorMessage(this.hotelForm, this.isFormSubmitted);
        console.log('error :',this.formsErrors);
        
      })
      
  }

  public hideError():void{
    this.errorMessage = null;
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
      console.log(hotel);
    this.displayHotel(hotel)      
    }
  )
}


public displayHotel(hotel : IHotel | undefined ){

 if (hotel) {
  this.hotel = hotel
  console.log(this.hotel);
  
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
    this.isFormSubmitted = true;
    this.hotelForm.updateValueAndValidity({
      onlySelf : true,
      emitEvent : true
    });
    if (this.hotelForm.valid) {
        if (this.hotelForm.dirty) {
          // this.hotel = this.hotelForm.value
          const hotel : IHotel = {
            ...this.hotel,
            ...this.hotelForm.value
          };
          console.log(hotel);
          
          if (this.hotel.id === 0  ) {
            this.hotelService.createHotel(hotel).subscribe(
              () => this.saveCompleted(),
              (err) => this.errorMessage = err
            )
          }else{
            this.hotelService.updateHotel(hotel).subscribe(
             () => this.saveCompleted(),
             (err) => this.errorMessage = err
            )
          }
        }
    }else{
      this.errorMessage = 'corrigez les erreurs svp'
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
