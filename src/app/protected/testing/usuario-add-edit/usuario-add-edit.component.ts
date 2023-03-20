import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Rol, DocumentType, Data } from 'src/app/auth/interfaces/auth.interface';
import { AuthService  } from 'src/app/auth/services/auth.service';



@Component({
  selector: 'app-usuario-add-edit',
  templateUrl: './usuario-add-edit.component.html',
  styleUrls: ['./usuario-add-edit.component.css']
})
export class UsuarioAddEditComponent implements OnInit {

  roles: Rol[] = [];
  documents: DocumentType[]=[];

  formUsuario: FormGroup;
  tituloAccion: string = "Nuevo";
  botonAccion: string = "Guardar"

  constructor(private dialogoReferencia: MatDialogRef<UsuarioAddEditComponent>, private fb:FormBuilder, private _autService: AuthService, private _document: AuthService) {
    this.formUsuario = this.fb.group({
      name: ['', Validators.required],
      lastname: ['',Validators.required],
      email: ['', Validators.required],
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['']
    })
   }

   addEditUsuario(){
    
    console.log(this.formUsuario.value)
    const modelo: Data ={
      name: this.formUsuario.value.name,
      lastname: this.formUsuario.value.lastname,
      email: this.formUsuario.value.email,
      documentType: this.formUsuario.value.documentType,
      documentNumber: this.formUsuario.value.documentNumber,
      password: this.formUsuario.value.password,
      roles: [this.formUsuario.value.roles]

    }
    const token: string = localStorage.getItem('token')!;
    this._autService.registrar(modelo,token).subscribe({
      next:(data)=>{
        console.log(data)
      }
    })
    // console.log(this.formUsuario.value.roles)
  }

  ngOnInit(): void {
    this.getRoles(localStorage.getItem('token')!);
    this.getDocument(localStorage.getItem('token')!);
  }

  getRoles(token: string){
    this._autService.getRoles(token)
    .subscribe({
      next:(data)=>{
        this.roles=data
        console.log(data)
      }
    })
  }

  getDocument(token: string){
    this._document.getDocument(token)
    .subscribe({
      next:(data)=>{
        this.documents=data
        console.log(data)
      }
    })
  }

}
