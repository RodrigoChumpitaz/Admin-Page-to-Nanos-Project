import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RecibosService } from 'src/app/auth/services/recibos.service';
import { DetallePedidoComponent } from '../pedidos/detalle-pedido/detalle-pedido.component';
import { PDFReceiptResponse, ReceiptsResponse } from 'src/app/auth/interfaces/recibos.interface';
import { DetalleReciboComponent } from './detalle-recibo/detalle-recibo.component';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { pdfDefinition } from './pdf-definition';
pdfmake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-recibos',
  templateUrl: './recibos.component.html',
  styles:[
    `
    table{
      width: 95%;
      margin: auto;
    }
    `
  ]
})
export class RecibosComponent implements OnInit {

  progress = 0;
  displayedColumns: string[] = ['paymentCode','igv','subtotal','discount','aditional','total','state','receiptNumber','acciones'];
  dataSource!: MatTableDataSource<ReceiptsResponse>;

  constructor(private reciboService: RecibosService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getReceipts();
  }

  getReceipts(){
    this.reciboService.getRecibos()
      .subscribe({
        next: (data: any) => {
          this.dataSource = new MatTableDataSource(data);
          this.progress = 100;
        }
      })
  }


  showDetail(data: any){
    this.dialog.open(DetalleReciboComponent ,{
      width: '1000px',
      height: '700px',
      data: data
    });
  }

  getState(state: string){
    if(state === 'Pendiente'){
      return 'pending';
    }
    if(state === 'paid'){
      return 'paid';
    }
    if(state === 'Por entregar'){

      return 'toDelivery';
    }
    if(state === 'Entregado'){
      return 'send'
    }
    return 'invalid';
  }


  createPdf(id: string){
    this.reciboService.getReciboPorId(id)
      .subscribe({
        next: (data: PDFReceiptResponse) => {
          const pdf = pdfmake.createPdf(pdfDefinition(data));
          pdf.open();
        }
      })
  }
}
