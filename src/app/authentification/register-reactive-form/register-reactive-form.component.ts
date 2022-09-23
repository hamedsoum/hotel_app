import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../register/user';

@Component({
  selector: 'app-register-reactive-form',
  templateUrl: './register-reactive-form.component.html',
  styleUrls: ['./register-reactive-form.component.css']
})
export class RegisterReactiveFormComponent implements OnInit {

  public registerForm! : FormGroup;


  public user : User = new User();

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName : ['',[Validators.required, Validators.maxLength(20)]],
      // lastName : {value : 'indisponible', disabled : true},
      lastName : ['',  [Validators.required, Validators.minLength(4)]],
      email :[ '', [Validators.required, Validators.email]],
      phone : '',
      notification : 'email',
      sendCatalogue : false

    });
    // this.registerForm = new FormGroup({
    //   firstName : new FormControl(null, [Validators.required, Validators.maxLength(20)]),
    //   lastName : new FormControl(null, [Validators.required, Validators.minLength(4)]),
    //   email : new FormControl(null, [Validators.required, Validators.email]),
    //   sendCatalogue : new FormControl(false)
    // })
  }

  public saveData(){
    
  }

  public fillFormData(){
    this.registerForm.setValue({
      firstName : 'John',
      lastName : 'Doe',
      email: 'jdoe@test.com',
      sendCatalogue : true
    })
  }

  public setNotificationSetting(method : string): void{
      const phoneControl = this.registerForm.get('phone');


      if (method === 'text') {
        phoneControl?.setValidators(Validators.required);
      }else{
        phoneControl?.clearValidators();
      }

      phoneControl?.updateValueAndValidity();
  }

}
