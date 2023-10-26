import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadersComponent } from './common-components/headers/headers.component';
import { FooterComponent } from './common-components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { environment } from 'environments/environment.prod';
import { AuthService } from './shared/services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot()
  ],
  // exports: [ HeadersComponent,
  //   FooterComponent],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
