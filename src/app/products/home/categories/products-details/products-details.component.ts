import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/service-proxies/products/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.less']
})
export class ProductsDetailsComponent implements OnInit {
  id: any;
  products:any;
  constructor(private activateRoute: ActivatedRoute, private productsService: ProductsService) {}
  ngOnInit(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.id = id; 
    this.getProducts();
  }

  getProducts(){
    this.productsService.getProductsByCategory(this.id).subscribe(
      (data) => {
        this.products = data;
        console.log(this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
