import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, ProfileInterface } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  constructor( private http: HttpClient ) { }

  login( email: string, password: string ){
    const url: string = `${this.baseUrl}/users/signin`;
    return this.http.post<AuthResponse>(url,{ email, password })
  }

  getProfile(token: string): Observable<ProfileInterface>{
    const url: string = `${this.baseUrl}/users/perfil`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ProfileInterface>(url, { headers: headers });
  }


  getUsers(token: string): Observable<ProfileInterface[]>{
    const url: string = `${this.baseUrl}/users/special`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ProfileInterface[]>(url,{ headers: headers});
  }

}
