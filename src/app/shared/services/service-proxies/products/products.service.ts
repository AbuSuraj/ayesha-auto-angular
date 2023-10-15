import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from 'src/app/shared/interfaces/categories';
// import { Categories } from '../../interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private BASE_URL = 'https://ayeshaauto.vercel.app';

  constructor(private http: HttpClient) {}

  // get cateogries
  getCategories(): Observable<Categories []> {
    return this.http.get<Categories []>(`${this.BASE_URL}/categories`);
  }

  // get products
  getProductsByCategory(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    return this.http.get<any>(`${this.BASE_URL}/category/${id}`, { headers });
  }

  
}
