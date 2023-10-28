import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { LottieModule } from 'ngx-lottie';
import { SellersComponent } from './sellers/sellers.component';
import { BuyersComponent } from './buyers/buyers.component';
import { ReportListComponent } from './report-list/report-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { OrdersComponent } from './orders/orders.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';

export function playerFactory():any { // add this line
  return import('lottie-web'); // add this line
}
@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    SellersComponent,
    BuyersComponent,
    ReportListComponent,
    AddCategoryComponent,
    AddProductComponent,
    ProductsListComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    LottieModule.forRoot({ player: playerFactory}),
    NgxPaginationModule
  ]
})
export class DashboardModule { }
