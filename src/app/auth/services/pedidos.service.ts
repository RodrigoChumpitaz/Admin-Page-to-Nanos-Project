import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PedidosInterface } from '../interfaces/pedidos.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }


  getOrders(token: string): Observable<PedidosInterface[]>{
    const url: string = `${this.baseUrl}/orders/orders`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<PedidosInterface[]>(url, {headers:headers});
  }

}
