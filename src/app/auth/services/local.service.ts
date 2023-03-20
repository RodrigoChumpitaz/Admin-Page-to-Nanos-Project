import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { RegistrarlocalI } from '../interfaces/local.interface';
import { DistritoResponse } from '../interfaces/distrito.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getAllLocal(token: string):Observable<RegistrarlocalI[]>{
    const direccion: string = `${this.baseUrl}/commons/locals`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<RegistrarlocalI[]>(direccion,{headers:headers});
  }

  registrar(modelo:RegistrarlocalI, token:string):Observable<RegistrarlocalI>{
    const baseUrl: string = `${this.baseUrl}/commons/addLocals`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<RegistrarlocalI>(baseUrl,modelo,{headers:headers});
  }

  getDistricts(token: string):Observable<DistritoResponse[]>{
    const direccion: string = `${this.baseUrl}/commons/distritos`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<DistritoResponse[]>(direccion,{headers:headers});
  }

  update(modelo:RegistrarlocalI, id: string, token: string):Observable<RegistrarlocalI[]>{
    const direccion: string = `${this.baseUrl}/commons/local/${id}`;
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.patch<RegistrarlocalI[]>(direccion,modelo,{headers:headers});
  }

}
