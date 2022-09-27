import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { IUser } from '../shared/models/user';
// import { User } from './user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm! : FormGroup;


  public user : IUser = new IUser();

  constructor() { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firtName : new FormControl(),
      lastName : new FormControl(),
      email : new FormControl(),
      sendCatalogue : new FormControl(true)
    })
  }

  public saveData(registerForn : NgForm){
    console.log(registerForn.form);
    console.log('valeur', JSON.stringify(registerForn.value));   
  }

}
