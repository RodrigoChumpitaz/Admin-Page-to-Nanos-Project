import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RegistrarlocalI, RegistrarlocaI } from 'src/app/auth/interfaces/local.interface';
import { LocalService } from 'src/app/auth/services/local.service';
import { LocalAddEditComponent } from './local-add-edit/local-add-edit.component';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesComponent implements OnInit {

  token: string = localStorage.getItem('token')!

  local: RegistrarlocalI[] = [];

  progress = 0;
  displayedColumns: string[] =['distrito','telefono','direccion','active','acciones'];
  dataSource!: MatTableDataSource<RegistrarlocalI>;

  constructor(private api: LocalService, private router:Router,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllLocal();
  }

  getAllLocal(){
    const token: string = localStorage.getItem('token')!;
    this.api.getAllLocal(token)
    .subscribe({
      next: (resp) => {
        this.local = resp;
      },
        error: (err) => {
          console.log(err);
        }
    }),
    this.api.getAllLocal(token)
    .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.progress = 100;
    })
  }

  dialogoNuevoLocal(){
    this.dialog.open(LocalAddEditComponent,{
      width: '500px',
      height: '500px'
    });
  }

  dialogoEditarLocal(dataLocal: RegistrarlocalI){
    this.dialog.open(LocalAddEditComponent,{
      disableClose:true,
      width: "500px",
      data: dataLocal
    }).afterClosed().subscribe(resultado =>{

    })
  }

  inactiveLocal(dataLoc: RegistrarlocaI){
    this.api.changeAvailable(this.token, dataLoc._id)
      .subscribe({
        next: (rs) =>{
          const url= self ? this.router.url : '/admin/locales';
          this.router.navigateByUrl('/',{skipLocationChange:true}).then( async ()=>{
            await this.router.navigate([`/${url}`])
          })
        },
        error: (err: any) => console.log(err.headers)
      })
  }

  getState(active: boolean){
    if(active){
      return 'paid'
    }else{
      return 'invalid'
    }
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
