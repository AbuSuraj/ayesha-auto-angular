import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private BASE_URL = 'https://ayeshaauto.vercel.app';
  private BASE_URL_LOCAL = 'http://localhost:5000'

  constructor(private http:HttpClient) { }

 createPayment(order:any):Observable<any>{
  console.log(order);
  
return  this.http .post(`${this.BASE_URL_LOCAL}/checkout`, {
    items: order ,
  })
}
 }

