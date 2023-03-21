import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RegistrarlocalI } from 'src/app/auth/interfaces/local.interface';
import { LocalService } from 'src/app/auth/services/local.service';
import { LocalAddEditComponent } from './local-add-edit/local-add-edit.component';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesComponent implements OnInit {

  local: RegistrarlocalI[] = [];

  progress = 0;
  displayedColumns: string[] =['distrito','telefono','direccion','acciones'];
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
        console.log(resp);
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
    console.log(dataLocal)
    this.dialog.open(LocalAddEditComponent,{
      disableClose:true,
      width: "350px",
      data: dataLocal
    }).afterClosed().subscribe(resultado =>{
      
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
