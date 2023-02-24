import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html'
})
export class SingupComponent{

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    documentType: ['', [Validators.required]],
    documentNumber: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private router: Router) { }

  register(){
    console.log(this.registerForm.value);
    this.router.navigateByUrl('/dashboard');
  }

}
