import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  private BASE_URL = 'https://ayeshaauto.vercel.app';

  constructor(private http: HttpClient) {}

  // get auth token from
  getToken(email: string): Observable<string> {
    return this.http.get<string>(`${this.BASE_URL}/jwt?email=${email}`);
  }

  
}
