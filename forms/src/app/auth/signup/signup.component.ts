import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from './password-match.validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule]
})
export class SignupComponent {
  signupForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    passwords: new FormGroup({
      password: new FormControl('',{
        validators: [ Validators.required, Validators.minLength(6)]
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
    }, {
      validators: [passwordMatchValidator]
    }),
    address: new FormGroup({
        street: new FormControl('', {
        validators: [Validators.required]
      }),
        number: new FormControl('', {
        validators: [Validators.required]
      }),
        postalCode: new FormControl('student', {
        validators: [Validators.required]
      }),
        city: new FormControl('', {
        validators: [Validators.required]
      }),
    }),
    firstName: new FormControl('', {
      validators: [Validators.required]
    }),
    lastName: new FormControl('', {
      validators: [Validators.required]
    }),
    jobRole: new FormControl('student', {
      validators: [Validators.required]
    }),
    source: new FormArray([
      new FormControl(),
      new FormControl(),
      new FormControl(),
    ]),
    agreeTerms: new FormControl(false, {
      validators: [Validators.required]
    }),
  });

  // validateSamePassword() {
  //   var p1 = this.signupForm.controls.password.value;
  //   var p2 = this.signupForm.controls.confirmPassword.value;

  //   if(p1 != p2) {
  //     return false;
  //   }
  //   return null;
  // }

  onSubmit () {
    console.log(this.signupForm)
  }
  onReset() {
    this.signupForm.reset();
  }
}
