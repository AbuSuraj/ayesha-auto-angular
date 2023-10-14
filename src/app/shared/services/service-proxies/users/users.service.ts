import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://ayeshaauto.vercel.app/users';

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<User>(this.apiUrl, user, { headers });
  }
}
