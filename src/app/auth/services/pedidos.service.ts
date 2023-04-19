import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PedidosInterface } from '../interfaces/pedidos.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private baseUrl: string = environment.baseUrl;

  private dataUpdated = new Subject<boolean>();

  constructor(private http: HttpClient) { }


  getOrders(token: string): Observable<PedidosInterface[]>{
    const url: string = `${this.baseUrl}/orders/orders`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<PedidosInterface[]>(url, {headers:headers});
  }

  cancelOrder(id: string){
    const url: string = `${this.baseUrl}/orders/cancelOrder/${id}`;
    return this.http.patch(url, {})
      .pipe(
        tap(() => {
          this.dataUpdated.next(true);
        })
      )
  }

  confimrOrder(id: string){
    const url: string = `${this.baseUrl}/orders/confirmOrder/${id}`;
    return this.http.patch(url, {})
      .pipe(
        tap(() => {
          this.dataUpdated.next(true);
        })
      )
  }

  get PedidoActualizado$(): Observable<boolean>{
    return this.dataUpdated.asObservable();
  }


}
