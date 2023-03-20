import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileInterface } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { ListarusuariosI } from 'src/app/auth/interfaces/listarusuario.interface';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-testing',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class TestingComponent implements OnInit{


  progress = 0;

  users: ProfileInterface[] = [];
  user: ListarusuariosI[] = [];

  displayedColumns: string[] = ['name', 'lastname', 'email','documentNumber','roles'];

  dataSource!: MatTableDataSource<ListarusuariosI>;
  

  constructor( private router: Router, private authService: AuthService, private userService:UserService ) { }

  ngOnInit(): void {
    // this.getUsers();
    this.getAllUsers();
  }

  logout(){
    this.router.navigateByUrl('/auth');
  }

  /*getUsers(){
    const token: string = localStorage.getItem('token')!;
    this.authService.getUsers(token)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.users = resp;
        },
        error: (err) => {
          console.log(err);
        }
      }),
    this.authService.getUsers(token)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.progress = 100;
      })
  }*/
  getAllUsers(){
    const token: string = localStorage.getItem('token')!;
    this.userService.getAllUser(token)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.user = resp;
        },
          error: (err) => {
            console.log(err);
          }
      }),
      this.userService.getAllUser(token)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.progress = 100;
      })

  }
}
