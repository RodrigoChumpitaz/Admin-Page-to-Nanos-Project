import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReceiptsResponse } from '../interfaces/recibos.interface';
import { DetailOrderResponse } from '../interfaces/pedidos.interface';

@Injectable({
  providedIn: 'root'
})
export class RecibosService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getRecibos(){
    const url: string = `${this.baseUrl}/sales-receipts/get-receipts`;
    return this.http.get<ReceiptsResponse[]>(url);
  }

  getReciboPorId(id: string){
    const url: string = `${this.baseUrl}/sales-receipts/get-receipt/${id}`;
    return this.http.get(url);
  }

  getDetailsByOrder(id: string){
    const url: string = `${this.baseUrl}/orders/getOrderDetailByOrder/${id}`;
    return this.http.get<DetailOrderResponse[]>(url);
  }
}
