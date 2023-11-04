import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/service-proxies/products/products.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class OrdersComponent implements OnInit {
  orders:any;

  constructor(public productsService: ProductsService){
  }

  ngOnInit(): void {
    const userData:any = localStorage.getItem('user');
    const user = JSON.parse(userData)
    this.productsService.getBuyerOrders(user.email).subscribe((res:any) =>{
        this.orders = res;
        console.log(this.orders);
        
    })
  }

}
