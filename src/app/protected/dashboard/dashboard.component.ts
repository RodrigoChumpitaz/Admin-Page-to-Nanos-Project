import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ReportService } from 'src/app/auth/services/report.service';
import { ReportCartResponse, SalesPerDayResponse } from 'src/app/auth/interfaces/report.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Card 1', cols: 1, rows: 1 },
  //         { title: 'Card 2', cols: 1, rows: 1 },
  //         { title: 'Card 3', cols: 1, rows: 1 },
  //         { title: 'Card 4', cols: 1, rows: 1 }
  //       ];
  //     }

  //     return [
  //       { title: 'Card 1', cols: 2, rows: 1 },
  //       { title: 'Card 2', cols: 1, rows: 1 },
  //       { title: 'Card 3', cols: 1, rows: 2 },
  //       { title: 'Card 4', cols: 1, rows: 1 }
  //     ];
  //   })
  // );

  /*
    ! aca estan los arreglo que se llenan con los datos de los reportes
   */
  productResult: any[] = [];
  salesResult: any[] = [];
  salesClientResult: any[] = [];
  categoryResult: any[] = [];
  orderDetailResult: any[] = [];
  view: [number, number] = [600, 400];
  

  /*
    ! estas son las opciones de los graficos
  */
  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  legendPosition: any = 'right';

  constructor(private breakpointObserver: BreakpointObserver, private reportService: ReportService) {}

  ngOnInit(): void {
    this.getReportCart();
    this.getSalesPerDay();
    this.totalSalesByClient();
    this.categoryOrder();
    this.orderDetailByDate()
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getReportCart(){
    this.reportService.topProductSale()
      .subscribe({
        next: (data: ReportCartResponse[]) => {
          this.productResult = data.map(item => {
            return { name: item.name, value: item.total, extra: item._id } || {};
          })
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  getSalesPerDay(){
    this.reportService.getSaleByDay()
      .subscribe({
        next: (data: SalesPerDayResponse[]) => {
          this.salesResult = data.map(item => {
            return { name: item._id.name, series: item.sales } || {};
          })
        }
      })
  }

  totalSalesByClient(){
    this.reportService.totalSaleByClient()
      .subscribe({
        next: (data) => {
          this.salesClientResult = data.map(item => {
            return { name: item._id.name, series: item.series } || {};
          })
        }
      })
  }

  categoryOrder(){
    this.reportService.topCategoryByOrder()
      .subscribe({
        next: (data) => {
          this.categoryResult = data.map(item => {
            return { name: item._id, value: item.total } || {};
          })
        }
      })
  }

  orderDetailByDate(){
    this.reportService.detailSalesByDate()
      .subscribe({
        next: (data) => {
          this.orderDetailResult = data.map(item => {
            return { name: item._id.carta, series: item.data } || {};
          })
        }
      })
  }

}
