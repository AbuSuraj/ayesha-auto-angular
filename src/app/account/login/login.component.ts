import { Component } from '@angular/core';
import { faEnvelope, faEye, faEyeSlash,  } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UsersService } from 'src/app/shared/services/service-proxies/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faEmail =  faEnvelope
  loginForm: FormGroup;
  showPassword: boolean = false;
  loginError!: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UsersService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),  Validators.pattern(/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/)]],
    });
  }

  onSubmit(user:any) {
    console.log(user);
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.loginError = '';
      this.authService.loginWithEmail(user.email, user.password);
     this.getToken(user.email);
      
    } else {
      this.loginError = 'Please fill out the form correctly.';
    }
    // Handle form submission, including validation
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  handleGoogleSignin() {
    this.authService.loginWithGoogle().then((user)=>{
     const email =  user.user?.email ?? '';
     this.getToken(email)
    })
  }

  getToken(email:string){
    
    this.userService.getToken(email).subscribe((token: string) => {
      localStorage.setItem('accessToken', token);
      this.router.navigate(['']);
    });
  }

}
