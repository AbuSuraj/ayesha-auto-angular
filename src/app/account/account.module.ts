import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'; 
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class AccountModule {
  constructor() { 
    // library.add(faEye, faEyeSlash);
  }
 }
