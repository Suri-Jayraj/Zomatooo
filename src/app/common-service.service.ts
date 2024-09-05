import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
   apiUrl = 'https://localhost:7160/api'; // Adjust the URL based on your environment

  constructor(private http: HttpClient) { }

  signUpUser(res: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login/SignUp`, res);
  }

  UserData(): Observable<any> {
    return this.http.get<any>('https://localhost:7160/api/Users');
  }


  login(res: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login/login`, res);
  }

  createresta(restaurant: any): Observable<any> {
    // return this.http.post(`${this.apiUrl}/Restaurants/CreateOrder`,restaurant)
     return this.http.post('https://localhost:7160/api/Restaurants/Createresta',restaurant) 
  }
  

  

}

