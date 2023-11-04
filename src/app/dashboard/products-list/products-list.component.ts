import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/products.interface';
import { ProductsService } from 'src/app/shared/services/service-proxies/products/products.service';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.less']
})
export class ProductsListComponent implements OnInit {
  products: any[] = [];
 email!: string;
 loading: boolean = false;
  constructor(private productsService: ProductsService, private toaster: ToastrService
    ){ 
  }

  ngOnInit(): void {
    this.getProducts();
  }
  
  getProducts(){
    this.loading = true;
    let userData:any = localStorage.getItem('user');
    const user:any =  JSON.parse(userData);
      this.productsService.getProductsBySeller(user?.email).subscribe(res =>{
        this.products = res;
        this.loading = false;
        console.log(this.products);
      },
      err =>{
        this.loading = false;
        this.toaster.error("Fail to load products", 'Internal Error');
      }
      );
  }

  handleAdvertise(id:string) {
    console.log(id);
    
    this.productsService.advertiseSingleProduct(id).subscribe(res =>{
      if(res.modifiedCount >0){
        Swal.fire('Added to the advertisement card successfully');
        this.getProducts();
      }
    },
  (error) =>{
    Swal.fire('Internal Error');
  }   
    )
  }

  handleDeleteProduct(id:string){

  }
  
}
