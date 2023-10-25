import { Component } from '@angular/core';
import { faEnvelope, faEye, faEyeSlash,  } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UsersService } from 'src/app/shared/services/service-proxies/users/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthTokenService } from 'src/app/shared/services/service-proxies/authorization/auth-token.service';

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

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UsersService, private router: Router,  private toastr: ToastrService, private authTokenService: AuthTokenService) {
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
      this.getToken(user.email);
      this.authService.loginWithEmail(user.email, user.password).then(() => {});
     this.toastr.success('Login Successfully!', 'Success');
      
    } else {
      this.loginError = 'Please fill out the form correctly.';
      this.toastr.success('Login Failed!', 'error');
    }
    // Handle form submission, including validation
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  handleGoogleSignin() {
    let  email = '';
    this.authService.loginWithGoogle().then((user)=>{
      email =  user.user?.email ?? '';
    //  this.toastr.success('Login Successfully!', 'Success');
    this.getToken(email)
    this.router.navigate(['']);
    })
  }

  getToken(email:string){
    
    this.authTokenService.getToken(email).subscribe((token: any) => {
      localStorage.setItem('accessToken', token.accessToken);
      this.router.navigate(['']);
    });
  }

}
