import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';


  constructor(private http: HttpClient) { }

  apiUrl = 'https://localhost:7160/api'; 

  // login(username: string, password: string) {
  //   return this.http.post<{token: string}>('https://localhost:7160/api/Login/login', { username, password });
  // }

  login(res: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login/login`, res);
  }
 

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Optionally, you can add a token expiry check here
    return !!token;
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  
  //ForgotPassword
  Forgotpassword(email: any): Observable<any> {
    const payload = { email: email }; // Wrap email in an object
    return this.http.post('https://localhost:7160/api/Login/ForgotPassword', payload, {
      headers: { 'Content-Type': 'application/json' } // Ensure content type is set
    });
  }
  

//ResetPassword
    resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post('https://localhost:7160/api/Login/reset-password', { token, newPassword });
}


}
