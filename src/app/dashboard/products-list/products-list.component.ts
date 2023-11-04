import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/products.interface';
import { ProductsService } from 'src/app/shared/services/service-proxies/products/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.less']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
 email!: string;
  constructor(private productsService: ProductsService,){

    // console.log(user);
    
  }
  ngOnInit(): void {
    let userData:any = localStorage.getItem('user');
    const user:any =  JSON.parse(userData);
      this.productsService.getProductsBySeller(user?.email).subscribe(res =>{
        this.products = res;
        console.log(this.products);
        
      })
  }
}
