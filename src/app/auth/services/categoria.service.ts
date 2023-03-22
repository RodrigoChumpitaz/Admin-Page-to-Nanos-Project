import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaI } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url:string = "http://localhost:3500";
  constructor(private http:HttpClient) { }

  getAllCategorias(){
    const direccion: string = `${this.url}/category/getCategories`;
    const headers = new HttpHeaders({
      'user_token': `${localStorage.getItem('token')}}`
    })
    return this.http.get<CategoriaI[]>(direccion, { headers: headers });
  }

  registrar(categoria:FormData, token: string):Observable<CategoriaI>{
    const baseurl: string = `${this.url}/category/addCategory`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<CategoriaI>(baseurl,categoria,{headers:headers})
  }

  editar(categoria:FormData, slug: string, token: string):Observable<CategoriaI>{
    const baseurl: string = `${this.url}/category/updateCategory/${slug}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.patch<CategoriaI>(baseurl,categoria,{headers:headers})
  }

  changeAvailable(token: string, _id: string){
    const baseurl: string = `${this.url}/category/changeState/${_id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.patch(baseurl, null, {headers:headers})
  }
}
