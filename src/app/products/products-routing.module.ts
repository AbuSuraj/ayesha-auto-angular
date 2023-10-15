import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { ProductsDetailsComponent } from './home/categories/products-details/products-details.component';

const routes: Routes = [
{  path:'',  component: HomeComponent,}, 
{ path:'category/:id', component: ProductsDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
