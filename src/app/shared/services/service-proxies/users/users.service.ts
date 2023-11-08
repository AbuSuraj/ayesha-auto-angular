import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // private BASE_URL = 'https://ayeshaauto.vercel.app';
  private BASE_URL = 'https://auto-reseller-api.vercel.app';
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


  // get buyers 

  getBuyers(
    page?: number,
    limit?: number,
    sortColumn?: string,
    sortDirection?: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    const url = `${this.BASE_URL}/buyers?page=${page}&limit=${limit}&sort=${sortColumn}&order=${sortDirection}`;
    
    return this.http.get<any>(url, { headers });
  }
     
  // delete a buyers 
  deleteBuyer(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    const url = `${this.BASE_URL}/buyer/${id}`;
    
    return this.http.delete(url, { headers });
  }

  // get sellers 

  getSellers(page?:number, limit?:number, sortColumn?:string, sortDirection?:string):Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
    });
    const url = `${this.BASE_URL}/sellers?page=${page}&limit=${limit}&sort=${sortColumn}&order=${sortDirection}`;
    return this.http.get<any>(url, { headers });
  }

  // verify seller 
  verifySeller(id:string){
    const headers = new HttpHeaders(
       {
        "content-type": "application/json",

        'Authorization': `bearer ${localStorage.getItem("accessToken")}`,
      }
    )
    return this.http.patch<any>(`${this.BASE_URL}/verifySeller/${id}`,{headers})
  }

}
