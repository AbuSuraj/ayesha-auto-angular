import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule
  ],
  exports: [LoaderComponent]
})
export class SharedModule { }
