import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEnvelope, faEye, faEyeSlash,  } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faEmail =  faEnvelope
  signupForm: FormGroup;
  signupError: string = '';
  showPassword: boolean = false;
  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/)]],
      userType: ['Buyer', [Validators.required]],
    });
  }

  onSubmit(user:any) {
    this.signupForm.markAllAsTouched()
    if (this.signupForm.valid) {
      this.signupError = ''
      console.log(user);
      //
    } else {
      this.signupError = 'Please fill out the form correctly.';
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  handleGoogleSignin() {
    // Implement Google login logic here
  }
}
