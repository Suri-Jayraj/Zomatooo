import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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


//   login(credentials: { email: string; password: string }): Observable<any> {
//     return this.http.post(`${this.apiUrl}/Login/login`, credentials);
// }
}

