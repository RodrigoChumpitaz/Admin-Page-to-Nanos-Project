import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cart, DetailOrderResponse, PedidosInterface } from 'src/app/auth/interfaces/pedidos.interface';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {

  datallePedido: DetailOrderResponse[] = [];
  clientName!: string;
  email!: string;
  deliveryDate!: Date;
  status!: string;
  observation!: string;


  constructor(@Inject(MAT_DIALOG_DATA)public data:PedidosInterface ) { }

  ngOnInit(): void {
    if(this.data){
      this.datallePedido = this.data.orderDetail;
      this.clientName = this.data.client.name;
      this.email = this.data.client.email;
      this.deliveryDate = this.data.deliveryDate;
      this.status = this.data.status;
      this.observation = this.data.observation;
    }

  }

}
