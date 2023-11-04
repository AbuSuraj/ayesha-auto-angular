import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Booking } from 'src/app/shared/interfaces/booking.interface';
import { Categories } from 'src/app/shared/interfaces/categories.interface';
import { Product } from 'src/app/shared/interfaces/products.interface';
// import { Categories } from '../../interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private BASE_URL = 'https://ayeshaauto.vercel.app';

  constructor(private http: HttpClient) { }

  // get a product for booking 
  private productSource = new BehaviorSubject<any>(null);
  currentProduct = this.productSource.asObservable();

  changeProduct(product: any) {
    this.productSource.next(product);
  }

  // get cateogries
  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.BASE_URL}/categories`);
  }

  // get products
  getProductsByCategory(id: string): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    return this.http.get<Product>(`${this.BASE_URL}/category/${id}`, { headers });
  }

  // book a product 
  bookProduct(booking: Booking): Observable<Booking> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `bearer ${localStorage.getItem('accessToken')}`
    })
    return this.http.post<Booking>(`${this.BASE_URL}/bookings`, booking, { headers });
  }

  // report product 
  reportProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    });

    return this.http.post<Product>(
      `${this.BASE_URL}/report`,
      product,
      { headers }
    );
  }

  // GET ALL ADVERTISE PRODUCT

  getAdvertiseProduct(): Observable<any> {
  return this.http.get<any>(`${this.BASE_URL}/advertisementItem`)
  }


  // get products for a specific seller 
  getProductsBySeller(email:any):Observable<any> { 
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    })
    // return this.http.get<[]>('https://ayeshaauto.vercel.app/myproducts/seller/sarwar@b.com')
    return this.http.get<any>(`${this.BASE_URL}/myproducts/seller/${email}`,{headers});
  }

  getBuyerOrders(email:any):Observable<any> { 
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    })
    // return this.http.get<[]>('https://ayeshaauto.vercel.app/myproducts/seller/sarwar@b.com')
    return this.http.get<any>(`${this.BASE_URL}/myorders/buyer/${email}`,{headers});
  }


}
