import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject, pipe, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, ProfileInterface,Data, Rol, DocumentType } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;

  private dataUpdated = new Subject<boolean>(); // necesario para observable

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
    return this.http.post<Data>(Url,modelo,{headers:headers})
    .pipe(
      tap(() => {
        this.dataUpdated.next(true); /* se usa para refrescar la data en tiempo real */
      })
    )
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
  
  getToken(){
    return localStorage.getItem('token');
  }

  update(modelo: Data, id: string, token: string):Observable<Data[]>{
    const direccion: string = `${this.baseUrl}/users/special/update-user/${id}`;
    const headers = new HttpHeaders({
      //'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.patch<Data[]>(direccion,modelo,{headers:headers})
    .pipe(
      tap(() => {
        this.dataUpdated.next(true); /* se usa para refrescar la data en tiempo real */
      })
    )
  }

  changeAvailable(token: string, _id: string){
    const baseurl: string = `${this.baseUrl}/users/special/change-user-status/${_id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.patch(baseurl, null, {headers:headers})
    .pipe(
      tap(() => {
        this.dataUpdated.next(true); /* se usa para refrescar la data en tiempo real */
      })
    )
  }

  get userActualizada$(): Observable<boolean>{ // necesario para tomar los datos nuevos
    return this.dataUpdated.asObservable();
  }

}
