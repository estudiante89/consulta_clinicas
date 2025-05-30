import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';
  currentUser$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const user = jwtDecode(token);
      this.currentUser$.next(user);
    }
  }

  login(data: { email: string; password: string }) {
    return this.http.post<any>('http://localhost:3000/auth/login', data).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.access_token);
        const user = jwtDecode(res.access_token);
        this.currentUser$.next(user);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.currentUser$.next(null);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
}
