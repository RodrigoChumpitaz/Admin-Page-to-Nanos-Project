import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, ProfileInterface,Data, Rol, DocumentType } from '../interfaces/auth.interface';

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

  getAllUser(token: string):Observable<Data[]>{
    const url: string = `${this.baseUrl}/users/special`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Data[]>(url,{headers:headers})
  }

  registrar(modelo:Data, token:string):Observable<Data>{
    const Url: string = `${this.baseUrl}/users/signup`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token_insert_user': `${token}`
    })
    return this.http.post<Data>(Url,modelo,{headers:headers});
  }

  getRoles(token: string):Observable<Rol[]>{
    const url: string = `${this.baseUrl}/roles`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Rol[]>(url, { headers: headers });
  }

  getDocument(token: string):Observable<DocumentType[]>{
    const url: string = `${this.baseUrl}/documents/getDocTypes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<DocumentType[]>(url,{ headers: headers});
  } 
}
