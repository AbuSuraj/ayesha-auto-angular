import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private BASE_URL = 'https://ayeshaauto.vercel.app';
  private BASE_URL_LOCAL = 'http://localhost:5000'

  constructor(private http: HttpClient) {}

  // save signUp information to db
  createUser(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify(user);

    return this.http.post<User>(`${this.BASE_URL}/users`, body, { headers });
  }
  // get a loggedIn user info from db  
  getLoggedInUserInfo(user: User):Observable<any>{
    console.log(user);
    return this.http.get<User>(`${this.BASE_URL}/user/${user?.email}`)
  }

  getSellers():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    return this.http.get(`${this.BASE_URL}/sellers`, {headers})
  }

}
