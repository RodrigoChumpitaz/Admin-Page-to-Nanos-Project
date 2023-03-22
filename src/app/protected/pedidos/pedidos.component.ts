import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PedidosInterface } from 'src/app/auth/interfaces/pedidos.interface';
import { PedidosService } from 'src/app/auth/services/pedidos.service';
import { DetallePedidoComponent } from './detalle-pedido/detalle-pedido.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styles:[
    `
    table{
      width: 95%;
      margin: auto;
    }
    `
  ]
})
export class PedidosComponent implements OnInit {

  progress = 0;
  displayedColumns: string[] = ['client','deliveryDate','status','imgPrueba','observation','acciones'];
  token: string = localStorage.getItem('token')!;
  dataSource!: MatTableDataSource<PedidosInterface>;
  // formatInactive: string  = 'pending';

  constructor(private orderService: PedidosService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos(){
    this.orderService.getOrders(this.token)
      .subscribe({
        next: (data: PedidosInterface[]) => {
          this.dataSource = new MatTableDataSource(data);
          this.progress = 100;
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    // this.progress = 100;
  }

  showDetail(data: PedidosInterface){
    this.dialog.open(DetallePedidoComponent ,{
      width: '1000px',
      height: '700px',
      data: data
    });
  }

  getState(state: string){
    if(state === 'Pendiente'){
      return 'pending';
    }
    if(state === 'Pagado'){
      return 'paid';
    }
    if(state === 'Por entregar'){

      return 'toDelivery';
    }
    return 'invalid';
  }

}
