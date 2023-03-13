import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileInterface } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-testing',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class TestingComponent implements OnInit{

  progress = 0;

  users: ProfileInterface[] = [];

  displayedColumns: string[] = ['_id', 'name', 'lastname', 'email'];

  dataSource!: MatTableDataSource<ProfileInterface>;

  constructor( private router: Router, private authService: AuthService ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  logout(){
    this.router.navigateByUrl('/auth');
  }

  getUsers(){
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
  }
}
