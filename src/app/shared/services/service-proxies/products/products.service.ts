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
  // private BASE_URL = 'https://ayeshaauto.vercel.app';
  private BASE_URL = 'https://auto-reseller-api.vercel.app';

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
 
    return this.http.get<any>(`${this.BASE_URL}/myproducts/seller/${email}`,{headers});
  }

  // get orders for a specific product 
  getBuyerOrders(email:any):Observable<any> { 
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    })
 
    return this.http.get<any>(`${this.BASE_URL}/myorders/buyer/${email}`,{headers});
  }

  // advertise a product  

  advertiseSingleProduct(product:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    })
 
    return this.http.patch<any>(`${this.BASE_URL}/products/advertise/${product.id}`,{headers});
  }

  // delete a product from seller table 

  deleteSingleProduct(id:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    const url = `${this.BASE_URL}/product/${id}`;
    
    return this.http.delete(url, { headers });
  }

  // report-list  
  // get report-list 

  getReportedProducts(page?:number, limit?:number, sortColumn?:string, sortDirection?:string):Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
    });
    const url = `${this.BASE_URL}/report?page=${page}&limit=${limit}&sort=${sortColumn}&order=${sortDirection}`;
    return this.http.get<any>(url, { headers });
  }

  // delete reported porducts 
  deleteReportedProduct(id:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    const url = `${this.BASE_URL}/reportedItem/${id}`;
    
    return this.http.delete(url, { headers });
  }
  // delete report
  deleteReport(id:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    const url = `${this.BASE_URL}/report/${id}`;
    
    return this.http.delete(url, { headers });
  }
}
