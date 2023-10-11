import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadersComponent } from './common-components/headers/headers.component';
import { FooterComponent } from './common-components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  // exports: [ HeadersComponent,
  //   FooterComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
