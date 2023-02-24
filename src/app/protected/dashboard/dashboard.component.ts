import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileInterface } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      *{
        margin: 15px;
      }
    `
  ]
})
export class DashboardComponent implements OnInit{

  users: ProfileInterface[] = [];

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
      })
  }
}
