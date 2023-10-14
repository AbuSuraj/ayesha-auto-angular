import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './home/slider/slider.component';


@NgModule({
    declarations: [
        ProductsComponent,
        HomeComponent,
        SliderComponent
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
    ]
})
export class ProductsModule { }
