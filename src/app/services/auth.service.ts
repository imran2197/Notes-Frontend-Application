import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isLocalEnv } from '../_helper/check-env';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: String = '';
  isUserLoggedIn = new BehaviorSubject(false);
  userDetails = new BehaviorSubject({});

  constructor(private http: HttpClient) {
    if (!isLocalEnv) {
      this.baseUrl =
        'https://notes-backend-application-50a7671c7b2e.herokuapp.com';
    } else {
      this.baseUrl = 'http://localhost:8080';
    }
  }

  getUserInfo(): Observable<any> {
    console.log(this.baseUrl);
    return this.http.get(`${this.baseUrl}/notes/userInfo`, {
      withCredentials: true,
    });
  }

  login(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/notes/login`, payload);
  }

  signup(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/notes/signup`, payload);
  }

  logout(): Observable<any> {
    return this.http.get(`${this.baseUrl}/notes/logout`);
  }
}
