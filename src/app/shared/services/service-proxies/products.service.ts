import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from '../../interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private BASE_URL = 'https://ayeshaauto.vercel.app';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Categories []> {
    return this.http.get<Categories []>(`${this.BASE_URL}/categories`);
  }
}
