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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipDirective } from './home/categories/products-details/booking/directives/tool-tip.directive';
import { AdvertisementComponent } from './home/advertisement/advertisement.component'; 
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        ProductsComponent,
        HomeComponent,
        SliderComponent,
        CategoriesComponent,
        ProductsDetailsComponent,
        BookingComponent,
        TooltipDirective,
        AdvertisementComponent
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        // LoaderComponent
        SharedModule
    ]
})
export class ProductsModule { }
