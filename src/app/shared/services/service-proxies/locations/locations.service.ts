import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private baseUrl = 'https://bdapis.com/api/v1.1';

  constructor(private http: HttpClient) {}

  getDivissions(): Observable<any> {
    console.log('getDistricts')
    return this.http.get(`${this.baseUrl}/divisions`);
  }
  getDivisionwiseDistricts(division:string): Observable<any> {
    console.log('get divisionwiseDistricts')
    return this.http.get(`${this.baseUrl}/division/${division}`);
  }
  getAllDistricts(): Observable<any> {
    console.log('getDistricts')
    return this.http.get(`${this.baseUrl}/districts`);
  }
}