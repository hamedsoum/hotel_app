import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup;

  private passwordValidationErrorMsg : any = {
    required : 'entrez votre mot de passe',
    pattern: 'le mot de passe doit contenir au moin 8 caractère, une lettre majuscule, une lettre minuscule'
  }
  public errorMessage!: string;
  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email :['', [Validators.email, Validators.required]],
      password : ['', [Validators.required, Validators.pattern('(?=^.{8,}$)((?=.*d)|(?=.*W+))(?![.n])(?=.*[A-Z])(?=.*[a-z]).*')]]
    })

    const passwordControl = this.loginForm.get('password');
    passwordControl?.valueChanges.subscribe( val => {
      console.log(val);
      this.setMessage(passwordControl);
      console.log(this.errorMessage);

    });
  }


  save(){
    console.log(this.loginForm.value);
    
  }


  private setMessage(val : AbstractControl) : void {
    console.log(val);
    this.errorMessage = '';
    if ((val.touched || val.dirty) && val.errors) {
      this.errorMessage = Object.keys(val.errors).map(
        key => this.passwordValidationErrorMsg[key]     
      ).join(' ');
    }
  }

}
