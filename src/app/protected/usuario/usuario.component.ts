import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Data, ProfileInterface, Dat } from 'src/app/auth/interfaces/auth.interface';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  token: string = localStorage.getItem('token')!
  progress = 0;

  users: ProfileInterface[] = [];
  user: Data[] = [];

  displayedColumns: string[] = ['name', 'lastname', 'email','documentNumber','roles','status','acciones'];

  dataSource!: MatTableDataSource<Data>;

  constructor(private router: Router, private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    const token: string = localStorage.getItem('token')!;
    this.authService.getAllUser(token)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.user = resp;
        },
          error: (err) => {
            console.log(err);
          }
      }),
      this.authService.getAllUser(token)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.progress = 100;
      })
  }

  dialogoNuevoUsuario(){
    this.dialog.open(UserAddEditComponent,{
      width: '700px',
      height: '500px'
    });
  }

  dialogoEditarUsuario(dataUser:Data){
    this.dialog.open(UserAddEditComponent,{
      width: '700px',
      height: '500px',
      data: dataUser
    }).afterClosed().subscribe(resultado => {

    })
  }

  inactiveUser(dataDat: Dat){
    this.authService.changeAvailable(this.token, dataDat._id)
      .subscribe({
        next: (rs) =>{
          const url= self ? this.router.url : '/admin/usuario';
          this.router.navigateByUrl('/',{skipLocationChange:true}).then( async ()=>{
            await this.router.navigate([`/${url}`])
          })
        },
        error: (err: any) => console.log(err.headers)
      })
  }

  getState(status: boolean){
    if(status){
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
