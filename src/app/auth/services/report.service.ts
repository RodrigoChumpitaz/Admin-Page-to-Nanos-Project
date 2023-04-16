import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategorySalesResponse, DetailSaleByDate, ReportCartResponse, SalesPerClient, SalesPerDayResponse } from '../interfaces/report.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = environment.baseUrl;

  topProductSale(){
    const url = `${this.baseUrl}/sales-receipts/get-orders-to-cart`;
    return this.http.get<ReportCartResponse[]>(url);
  }

  getSaleByDay(){
    const url = `${this.baseUrl}/sales-receipts/get-sales-per-day`;
    return this.http.get<SalesPerDayResponse[]>(url);
  }

  totalSaleByClient(){
    const url = `${this.baseUrl}/sales-receipts/total-sales-by-client`;
    return this.http.get<SalesPerClient[]>(url);
  }

  topCategoryByOrder(){
    const url = `${this.baseUrl}/sales-receipts/count-orders-to-category`;
    return this.http.get<CategorySalesResponse[]>(url);
  }

  detailSalesByDate(){
    const url = `${this.baseUrl}/sales-receipts/orderDetail-to-sale-date`;
    return this.http.get<DetailSaleByDate[]>(url);
  }

}
