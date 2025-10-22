import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ProfileModel} from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  readonly TOKEN_KEY = 'auth_token';


  constructor(private http: HttpClient) {

  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !!token;
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }


  login(credentials: any, expectedRole: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        const token = response.token;
        const username = response.username;
        const email = credentials.email;
        const role = response.role;
        const id = response.id;
        if (response.role !== expectedRole) {
          throw new Error('Unauthorized role');
        }
        const userData = {token, username, role, email, id};
        localStorage.setItem(this.TOKEN_KEY, JSON.stringify(userData));
        this.currentUserSubject.next(userData);
      })
    );
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }


  getUserDetails(id: string): Observable<ProfileModel> {
    return this.http.get(`${this.apiUrl}/users/${id}`,)
  }


  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
  }


}
