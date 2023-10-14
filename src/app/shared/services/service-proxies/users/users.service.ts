import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private BASE_URL = 'https://ayeshaauto.vercel.app';

  constructor(private http: HttpClient) {}

  // save signUp information to db
  createUser(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<User>(`${this.BASE_URL}/users`, user, { headers });
  }

  // get auth token from
  getToken(email: string): Observable<string> {
    return this.http.get<string>(`${this.BASE_URL}/jwt?email=${email}`);
  }
}
