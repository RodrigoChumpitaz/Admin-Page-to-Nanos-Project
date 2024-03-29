import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
  token: string = '';
  miForm: FormGroup = this.fb.group({
    email: ['cchumpitaz@idat.com', [Validators.required, Validators.email]],
    password: ['carlitos', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

  }

  login(){
    console.log(this.miForm.value);
    const { email, password } = this.miForm.value;
    this.authService.login(email,password)
      .subscribe({
        next: (resp: AuthResponse) => {
          localStorage.setItem('token', resp.token);
          this.token = resp.token;
          this.authService.getProfile(this.token)
            .subscribe({
              next: (resp) => {
                const userRol = resp.roles[0].rol;
                if(userRol === 'admin' || userRol === 'moderator'){
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })

                  Toast.fire({
                    icon: 'success',
                    title: `Bienvenido ${resp.name}`
                  })
                  this.router.navigateByUrl('/admin');
                }else{
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })

                  Toast.fire({
                    icon: 'error',
                    title: 'No eres administrador'
                  })
                }
              },
              error: (err) => {
                Swal.fire('Error', err.error.msg, 'error');
              }
            })
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
          localStorage.clear();
        }
      })
  }
}
