import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope, faEye, faEyeSlash,  } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UsersService } from 'src/app/shared/services/service-proxies/users/users.service';
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
  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UsersService, private router: Router) {
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
      this.signupError = '';
      let userData = {
        name: user.name,
        email: user.email,
        userType: user.userType
      }
      this.userService.createUser(userData).subscribe();
      this.getToken(user.email)
      console.log(user.name)
      const userInfo = {
        displayName: user.name,
      };
      this.authService.signUpWithEmail(user.email, user.password);
      this.authService.updateUserProfile(user.name);
    } else {
      this.signupError = 'Please fill out the form correctly.';
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  handleGoogleSignin() {
    this.authService.loginWithGoogle().then((user) => {
      const userInfo: User = {
        name:user?.user?.displayName ,
        email:user.user?.email,
        userType: 'Buyer'
      } 
      this.getToken(user.user?.email ?? '')

      this.userService.createUser(userInfo).subscribe()
    }) 
  }

  getToken(email:string){
    
    this.userService.getToken(email).subscribe((token: string) => {
      localStorage.setItem('accessToken', token);
      this.router.navigate(['']);
    });
  }
}
