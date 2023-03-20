import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ListarusuariosI } from '../interfaces/listarusuario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getAllUser(token: string):Observable<ListarusuariosI[]>{
    const url: string = `${this.baseUrl}/users/special`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ListarusuariosI[]>(url,{headers:headers})
  }
}
