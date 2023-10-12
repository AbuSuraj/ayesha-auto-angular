import { Component } from '@angular/core';
import { faEye, faEyeSlash,  } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  loginForm: FormGroup;
  showPassword: boolean = false;
  loginError!: string;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    // Handle form submission, including validation
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  handleGoogleSignin() {
    // Implement Google login logic here
  }

}
