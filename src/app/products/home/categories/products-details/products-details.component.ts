import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/service-proxies/products/products.service';
import { UsersService } from 'src/app/shared/services/service-proxies/users/users.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.less']
})
export class ProductsDetailsComponent implements OnInit {
  id: any;
  products:any;
  sellser:any;
  constructor(private activateRoute: ActivatedRoute, private productsService: ProductsService, private userService: UsersService) {}

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    console.log(id);
  
    this.id = id; 
    this.getProducts();
    this.getSellers();
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
  
  getSellers(){
    this.userService.getSellers().subscribe(data => {
      this.sellser = data;
      console.log(this.sellser);
    })
  }
}
