import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cart, Carta } from 'src/app/auth/interfaces/carta.interface';
import { CartaService } from 'src/app/auth/services/carta.service';
import { CartaEditComponent } from './carta-edit/carta-edit.component';
import { CartaNuevaComponent } from './carta-nueva/carta-nueva.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {

  token: string = localStorage.getItem('token')!
  progress = 0;
  showData = false;
  displayedColumns: string[] = ['imgUrl','name','description','price','category','available','acciones'];
  dataSource!: MatTableDataSource<Carta>;

  constructor(private cartaService:CartaService, private router:Router,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.getAllcarta();
    this.cartaService.cartaActualizada$.subscribe(data => {
      this.getAllcarta();
    })
  }

  nuevaCarta() {
    this.dialog.open(CartaNuevaComponent,{
      width: '600px',
      height: '400px'

    });
    this.getAllcarta();

  }

  getAllcarta(){
    this.cartaService.getAllCarta()
    .subscribe(data => {
      this.dataSource= new MatTableDataSource(data);
      this.progress = 100;
    })
  }
  editarcarta(dataCart:Cart){
    this.dialog.open(CartaEditComponent,{
        width: '600px',
        height: '600px',
        data: dataCart
    })
  }

  inactiveCart(dataCart: Cart){
    this.cartaService.changeAvailable(this.token, dataCart._id)
      .subscribe({
        next: (rs:any) =>{
          const url= self ? this.router.url : '/admin/carta';
          if(rs.message==="Cart disabled succesfully"){
            const Toast = Swal.mixin({
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
            Toast.fire({
              icon: 'error',
              title: 'se deshabilito la carta seleccionada',
            })
          }else if(rs.message==="Cart enabled succesfully"){
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
              title: 'Se habilito la Carta Seleccionada',
            })
          }
        },
        error: (err: Error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
          })
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getState(state: boolean){
    if(state){
      return 'paid'
    }else{
      return 'invalid'
    }
  }

  getColorButton(state: boolean){
    if(state){
      return 'warn'
    }
    return 'primary'
  }

}
