import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailOrderResponse } from 'src/app/auth/interfaces/pedidos.interface';
import { ReceiptsResponse } from 'src/app/auth/interfaces/recibos.interface';
import { RecibosService } from 'src/app/auth/services/recibos.service';

@Component({
  selector: 'app-detalle-recibo',
  templateUrl: './detalle-recibo.component.html',
  styleUrls: ['./detalle-recibo.component.css']
})
export class DetalleReciboComponent implements OnInit {

  datallePedido!: DetailOrderResponse[];
  paymentCode!: string;
  orderId!:string;
  igv!:number;
  subtotal!:number;
  total!:number;
  discount!:number;
  receiptNumber!:number;

  constructor(@Inject(MAT_DIALOG_DATA)public data:ReceiptsResponse, private reciboService: RecibosService) { }

  ngOnInit(): void {
    this.obtenerDetalleRecibo();
  }

  obtenerDetalleRecibo(){
    this.reciboService.getDetailsByOrder(this.data.orderId)
      .subscribe({
        next: (data) => {
          this.datallePedido = data;
        }
      })
  }
}
