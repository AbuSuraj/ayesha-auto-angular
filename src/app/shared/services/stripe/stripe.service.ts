import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  // console.log(order);
  
return  this.http .post(`${this.BASE_URL_LOCAL}/checkout`, {
    items: order ,
    // successUrl: "https://barohal-store-server.netlify.app/success.html",
    // cancelUrl: "https://barohal-store-server.netlify.app/cancel.html",
  })
}

payment(payment:any){
  const body = JSON.stringify(payment);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  })
  return this.http.post(`${this.BASE_URL_LOCAL}/payments`, body, { headers })
}
 }

