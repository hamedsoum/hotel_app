import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { User } from '../register/user';

@Component({
  selector: 'app-register-reactive-form',
  templateUrl: './register-reactive-form.component.html',
  styleUrls: ['./register-reactive-form.component.css']
})
export class RegisterReactiveFormComponent implements OnInit {

  public registerForm! : FormGroup;


  public user : User = new User();

  constructor() { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firtName : new FormControl(),
      lastName : new FormControl(),
      email : new FormControl(),
      sendCatalogue : new FormControl(true)
    })
  }

  public saveData(){

        
  }

}
