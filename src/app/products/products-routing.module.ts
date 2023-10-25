import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { ProductsDetailsComponent } from './home/categories/products-details/products-details.component';
import { BookingComponent } from './home/categories/products-details/booking/booking.component';

const routes: Routes = [
{  path:'', title:'Home', component: HomeComponent,}, 
{ path:'category/:id',title:'Cars', component: ProductsDetailsComponent},
{ path:'category/:id',
children: [
  {
    path: 'booking',title:'Booking', component: BookingComponent
  }
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
