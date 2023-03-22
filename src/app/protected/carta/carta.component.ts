import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cart, Carta } from 'src/app/auth/interfaces/carta.interface';
import { CartaService } from 'src/app/auth/services/carta.service';
import { CartaEditComponent } from './carta-edit/carta-edit.component';
import { CartaNuevaComponent } from './carta-nueva/carta-nueva.component';

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
  }
  nuevaCarta() {
    this.dialog.open(CartaNuevaComponent,{
      width: '1000px',
      height: '700px'

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
        width: '1000px',
        height: '700px',
        data: dataCart
    })
  }

  inactiveCart(dataCart: Cart){
    this.cartaService.changeAvailable(this.token, dataCart._id)
      .subscribe({
        next: (rs) =>{
          const url= self ? this.router.url : '/admin/categoria';
          this.router.navigateByUrl('/',{skipLocationChange:true}).then( async ()=>{
            await this.router.navigate([`/${url}`])
          })
        },
        error: (err: any) => console.log(err.headers)
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
