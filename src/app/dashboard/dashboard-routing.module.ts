import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { SellersComponent } from './sellers/sellers.component';
import { BuyersComponent } from './buyers/buyers.component';
import { ReportListComponent } from './report-list/report-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path:'', component: DashboardComponent ,
     children:[
    {path:'home', component: DashboardHomeComponent},
    {path:'orders', component: OrdersComponent},
    {path:'sellers', component: SellersComponent},
    {path:'buyers', component: BuyersComponent},
    {path:'reports', component: ReportListComponent},
    {path:'add-category', component: AddCategoryComponent},
    {path:'products', component: ProductsListComponent},
    {path:'add-product', component: AddProductComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
