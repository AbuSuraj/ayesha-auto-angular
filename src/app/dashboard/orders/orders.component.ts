import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/service-proxies/products/products.service'; 
import { StripeService } from 'src/app/shared/services/stripe/stripe.service';
import { loadStripe } from '@stripe/stripe-js';
import {environment} from '../../../../environments/environment'
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class OrdersComponent implements OnInit {
  orders:any;

  constructor(public productsService: ProductsService, private stripe: StripeService){
  }

  ngOnInit(): void {
    const userData:any = localStorage.getItem('user');
    const user = JSON.parse(userData)
    this.productsService.getBuyerOrders(user.email).subscribe((res:any) =>{
        this.orders = res;
        console.log(this.orders);
        
    })
  }

  onCheckout(order:any){
    console.log(order);
    
    const orderArray = [order];
    if (Array.isArray(orderArray)) {
      // console.log(orderArray);
      
      this.stripe.createPayment(orderArray).subscribe(async (res: any) => {
   console.log(res);
        
        let stripe = await loadStripe(environment.stripe.publicKey);
        stripe?.redirectToCheckout({
          sessionId: res.id,
        }) 
        // .then((result)=>{
        //   if (result.error) {
        //     console.error(result.error);
        //   } else if (result) {
        //     console.log(result);
            
        //     // Payment was successful, send payment information to your server
        //     const payment = {
        //       resalePrice: order.resalePrice,
        //       transactionId: result,
        //       email: order.email,
        //       bookingId: order._id,
        //       product_id: order.product_id,
        //     };
        //     this.stripe.payment(payment).subscribe(res =>{
        //       console.log(res);
              
        //     })
        //   }
        // })
        console.log(res)
      });
    } else {
      // Handle the case where 'order' is not an array
      console.error("'order' is not an array.");
    }
    
  //   this.stripe.createPayment(order).subscribe(async (res:any) => {
  //     let stripe = await loadStripe('pk_test_51M8qlKHEhQ4vnNT3pb7gkGIFinsyDPpQAjGCuC0noHZaEIs5CFahEMknDcxahuKEK2kT8cklZOX6bq3aQjwyJ0gZ00g2GMU2Gx');
  //     stripe?.redirectToCheckout({
  //       sessionId: res.id
  //     })      
  // })
  }

}
