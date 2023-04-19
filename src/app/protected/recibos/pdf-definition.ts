import { PDFReceiptResponse } from "src/app/auth/interfaces/recibos.interface";
import { imgBase64 } from "./img/img";
import * as dayjs from "dayjs";
import { firmabase64 } from "./img/firma";

export const pdfDefinition = (data: PDFReceiptResponse) => {
  const date = dayjs(data.fecha_emision).format("DD/MM/YYYY");
  return  {
    pageSize: 'A4',
    pageMargins: [ 40, 60, 40, 60 ],
    content: [
      {
        columns: [
          {
            image: imgBase64,
            width: 150,
			      height: 150,
          },
          {
            stack:[
              {
                text: '\n\nNaños Chicken',
                style: 'header',
                margin: [0, 0, 0, 10],
                fontSize: 20,
                bold: true,
                color: '#F57A34'
              },
              {
                text: 'RUC: 12345678901',
                style: 'header',
              },
              {
                text: 'Dirección: Av Jose Carlos Mariátegui 517',
              }
            ],
            alignment: 'center'
          }
        ]
      },
      {
        columns: [
          {
            stack:[
              { text: `Codigo de Pago:`, margin: [0, 0, 0, 2]},
              { text: `${data.paymentCode}`, color: 'blue', margin: [0, 0, 0, 5]},
            ],
            alignment: 'left',
            margin: [0, 0, 0, 10]
          },
          {
            stack:[
              {
                text: `Nº Recibo: ${data.receiptNumber}`,
              },
              {
                text: `Fecha emisión: ${date}`,
              }
            ],
            alignment: 'right',
            margin: [0, 0, 0, 10]
          }
        ]
      },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          widths: [ '*', 'auto', 100, 100 ],
          body: [
            [{ text: 'Carta', bold: true }, { text: 'Cantidad', bold: true }, { text: 'Precio', bold: true }, { text: 'Total', bold: true }],
            ...data.cartas.map((detail) => {
              return [detail.name, detail.quantity, detail.price, detail.price * detail.quantity];
            })
          ],
          alingment: 'center',
        }
      },
      {
        table: {
          widths: [ '*', 100 ],
          body: [
            [{ text: 'Descuento', bold: true }, { text: data.discount }],
            [{ text: 'Adicional', bold: true }, { text: data.aditional }],
            [{ text: 'IGV', bold: true }, { text: data.igv }],
            [{ text: 'Subtotal', bold: true }, { text: data.subtotal }],
            [{ text: 'Total', bold: true }, { text: data.total }],
          ]
        }
      },
      {
        columns: [
          {
            stack:[
              {
                text: 'Cliente:',
                bold: true,
                margin:[0, 75, 0, 0],
              },
              {
                text: data.order._client,
                // margin:[0, 25, 0, 10],
              }
            ]
          },
          {
            stack:[
              {
                image: firmabase64,
                width: 150,
                height: 50,
                alignment: 'right',
              },
              {
                text: '----------------------------------------------',
              },
              {
                text: 'Firma',
                margin: [0, 0, 60, 0],
              }
            ],
            margin: [0, 25, 0, 10],
            alignment: 'right'
          }
        ],
      }
    ]
  }
}
