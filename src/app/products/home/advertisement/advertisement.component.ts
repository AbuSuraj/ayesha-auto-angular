import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/products.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ProductsService } from 'src/app/shared/services/service-proxies/products/products.service';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.less']
})
export class AdvertisementComponent implements OnInit {
  advertiseProduct:any;
  isLoggedIn:boolean = false;
  tooltipText: string='Price ';

  constructor(private productsService: ProductsService, private authService: AuthService, private router: Router ){}

  ngOnInit(): void {
      this.productsService.getAdvertiseProduct().subscribe(data=>{
        this.advertiseProduct = data;
        console.log(this.advertiseProduct);
      })

     this.isLoggedIn= this.authService.isLoggedIn;
     console.log(this.isLoggedIn);
     
  }

  changeTooltip(newText: any) {
    // console.log(newText);
    this.tooltipText = "Price $" + newText;
  }
  addBooking(product: any){ 
    this.productsService.changeProduct(product);
    this.router.navigate(['/category',product.categoryId, 'booking'])
  }
}
