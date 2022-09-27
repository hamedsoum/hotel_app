import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { User } from '../register/user';
import { debounceTime } from 'rxjs/operators'

// function ratingRangeValidator(c : AbstractControl): { [key : string] : boolean} | null {
//   if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
//     return { 'rangeErro' : true}
//   }

//   return null;
// }

function ratingRangeValidator(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'rangeErro': true }
    }
    return null;
  }
}

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {

  const emailControl = c.get('email');

  const emailConfirmControl = c.get('confirmEmail');

  if ((emailControl?.pristine || emailConfirmControl?.pristine) || (emailControl?.pristine || emailConfirmControl?.value === '')) {
    return null;
  }
  if (emailControl?.value === emailConfirmControl?.value) {
    return null
  }
  return { 'match': true };
}

function passwordMatcherError(c: AbstractControl): { [key: string]: boolean } | null {

  const passwordControl = c.get('password');
  const confirmPasswordControl = c.get('confirmPassword');  
  console.log(confirmPasswordControl);

  
  if ((passwordControl?.pristine || confirmPasswordControl?.pristine) || (passwordControl?.pristine || confirmPasswordControl?.value === '')) {
    return null;
  }
  if (passwordControl?.value === confirmPasswordControl?.value) {
    return null
  }
  return { 'passwordMatch': true };
}


@Component({
  selector: 'app-register-reactive-form',
  templateUrl: './register-reactive-form.component.html',
  styleUrls: ['./register-reactive-form.component.css']
})
export class RegisterReactiveFormComponent implements OnInit {

  public registerForm!: FormGroup;

  public user: User = new User();

  public errorMessage!: string;

  private validationErrorMessage: any = {
    required: 'entrez votre E-email',
    email: 'entrez un format email valid'
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      // lastName : {value : 'indisponible', disabled : true},
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      }, { validators: emailMatcher }),
      passwordGroup: this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, { validators: passwordMatcherError }),
      phone: '',
      notification: 'email',
      rating: [null, ratingRangeValidator(1, 5)],
      sendCatalog: true,
      addresses: this.fb.array([this.createAddresseGroup()])
    });

    this.registerForm.get('notification')?.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => {
        this.setNotificationSetting(value)
      }
    );



    const emailControl = this.registerForm.get('emailGroup.email');
    emailControl?.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(val => {
      this.setMessage(emailControl);
    });
  }

  public get addressesList(): FormArray {
    return this.registerForm.get('addresses') as FormArray;
  }
  public saveData() {

  }

  public fillFormData() {
    this.registerForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'jdoe@test.com',
      sendCatalogue: true
    })
  }

  public setNotificationSetting(method: string): void {
    const phoneControl = this.registerForm.get('phone');


    if (method === 'text') {
      phoneControl?.setValidators(Validators.required);
    } else {
      phoneControl?.clearValidators();
    }

    phoneControl?.updateValueAndValidity();
  }

  private setMessage(val: AbstractControl): void {
    this.errorMessage = '';
    if ((val.touched || val.dirty) && val.errors) {
      this.errorMessage = Object.keys(val.errors).map(
        key => this.validationErrorMessage[key]
      ).join(' ');
    }

  }

  private createAddresseGroup(): FormGroup {
    return this.fb.group({
      addresstype: ['home'],
      street1: [''],
      street2: [''],
      city: [''],
      state: [''],
      zip: [''],
    })
  }

  public addAddress(): void {
    this.addressesList.push(this.createAddresseGroup());
  }

}
