import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './home/slider/slider.component';
import { CategoriesComponent } from './home/categories/categories.component';
import { ProductsDetailsComponent } from './home/categories/products-details/products-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookingComponent } from './home/categories/products-details/booking/booking.component';


@NgModule({
    declarations: [
        ProductsComponent,
        HomeComponent,
        SliderComponent,
        CategoriesComponent,
        ProductsDetailsComponent,
        BookingComponent
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        FontAwesomeModule
    ]
})
export class ProductsModule { }
