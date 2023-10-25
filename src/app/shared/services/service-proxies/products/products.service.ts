import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Categories } from 'src/app/shared/interfaces/categories';
import { Product } from 'src/app/shared/interfaces/products';
// import { Categories } from '../../interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private BASE_URL = 'https://ayeshaauto.vercel.app';

  constructor(private http: HttpClient) {}

  // get a product for booking 
  private productSource = new BehaviorSubject<any>(null);
  currentProduct = this.productSource.asObservable();

  changeProduct(product: any) {
    this.productSource.next(product);
  }

  // get cateogries
  getCategories(): Observable<Categories []> {
    return this.http.get<Categories []>(`${this.BASE_URL}/categories`);
  }

  // get products
  getProductsByCategory(id: string): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    return this.http.get<Product>(`${this.BASE_URL}/category/${id}`, { headers });
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

}
