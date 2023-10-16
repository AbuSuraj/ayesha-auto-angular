import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './home/slider/slider.component';
import { CategoriesComponent } from './home/categories/categories.component';
import { ProductsDetailsComponent } from './home/categories/products-details/products-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookingModalComponent } from './home/categories/products-details/booking-modal/booking-modal.component'; 
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
    declarations: [
        ProductsComponent,
        HomeComponent,
        SliderComponent,
        CategoriesComponent,
        ProductsDetailsComponent,
        BookingModalComponent
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        FontAwesomeModule, 
        MatDialogModule
    ]
})
export class ProductsModule { }
