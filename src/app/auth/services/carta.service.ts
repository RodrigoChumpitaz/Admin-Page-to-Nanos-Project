import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carta } from '../interfaces/carta.interface';

@Injectable({
  providedIn: 'root'
})
export class CartaService {
  private url:string = "http://localhost:3500";
  

  constructor(private http:HttpClient) { }

  getAllCarta(){
    const direccion: string = `${this.url}/carta/getCart`;
    return this.http.get<Carta[]>(direccion);
  }
  registrar(carta:FormData, token:string):Observable<Carta>{
    const baseurl: string = `${this.url}/carta/addCart`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Carta>(baseurl,carta,{headers:headers})
  }
  editar(carta:FormData, token:string):Observable<Carta>{
    const baseurl: string = `${this.url}/carta/updateCart`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.patch<Carta>(baseurl,carta,{headers:headers})
  }
  changeAvailable(token:string, _id:string){
    const baseurl: string = `${this.url}/carta/unvailableCart/${_id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.patch(baseurl, null, {headers:headers})
  }
}
