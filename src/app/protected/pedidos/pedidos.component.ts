import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PedidosInterface } from 'src/app/auth/interfaces/pedidos.interface';
import { PedidosService } from 'src/app/auth/services/pedidos.service';
import { DetallePedidoComponent } from './detalle-pedido/detalle-pedido.component';
import Swal from 'sweetalert2';

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
  displayedColumns: string[] = ['client','deliveryDate','status','saleType','imgPrueba','observation','acciones'];
  token: string = localStorage.getItem('token')!;
  dataSource!: MatTableDataSource<PedidosInterface>;

  constructor(private orderService: PedidosService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPedidos();
    this.orderService.PedidoActualizado$.subscribe(data => {
      this.getPedidos();
    })
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
    if(state === 'Entregado'){
      return 'send'
    }
    if(state === 'presencial' || state === 'delivery'){
      return 'description'
    }

    return 'invalid';
  }

  confirmOrder(id: string){
    this.orderService.confimrOrder(id)
      .subscribe({
        next: (data: any) => {
          const Toast1 = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast1.fire({
            icon: 'info',
            title: data.message,
          })
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          })
        }
      });
  }

  invalidOrder(id: string){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres invalidar este pedido?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.cancelOrder(id)
        .subscribe({
          next: (data: any) => {
            const Toast1 = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast1.fire({
              icon: 'info',
              title: data.message,
            })
          },
          error: (err: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.error.message,
            })
          }
        })
      }
    })

  }

}
