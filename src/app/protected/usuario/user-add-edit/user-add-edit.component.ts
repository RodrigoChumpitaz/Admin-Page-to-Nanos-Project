import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol, DocumentType, Data } from 'src/app/auth/interfaces/auth.interface';
import { AuthService  } from 'src/app/auth/services/auth.service';



@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {

  roles: Rol[] = [];
  documents: DocumentType[]=[];

  formUsuario: FormGroup;
  tituloAccion: string = "Nuevo";
  botonAccion: string = "Guardar"

  constructor(private dialogoReferencia: MatDialogRef<UserAddEditComponent>, private fb:FormBuilder, private _autService: AuthService, private _document: AuthService, @Inject (MAT_DIALOG_DATA)public dataUser:Data) {
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
      _id: this.formUsuario.value.id,
      name: this.formUsuario.value.name,
      lastname: this.formUsuario.value.lastname,
      email: this.formUsuario.value.email,
      documentType: this.formUsuario.value.documentType,
      documentNumber: this.formUsuario.value.documentNumber,
      password: this.formUsuario.value.password,
      roles: [this.formUsuario.value.roles]
    }
    const token: string = localStorage.getItem('token')!;
    if(this.dataUser == null){
      this._autService.registrar(modelo,token).subscribe({
        next:(data)=>{
          console.log(data)
        }
      })
    }else{
      const token: string = localStorage.getItem('token')!;
      console.log(this.dataUser);
      this._autService.update(modelo,this.dataUser._id, token).subscribe({
      next: (data)=>{
        console.log(data)
      },
      error: (err) =>{
        console.log(err)
      }
    })
    } 
    // console.log(this.formUsuario.value.roles)
  }

  ngOnInit(): void {
    this.getRoles(localStorage.getItem('token')!);
    this.getDocument(localStorage.getItem('token')!);
    if(this.dataUser){
      this.formUsuario.patchValue({
        id: this.dataUser._id,
        name: this.dataUser.name,
        lastname: this.dataUser.lastname,
        email: this.dataUser.email,
        documentType: this.dataUser.documentType,
        documentNumber: this.dataUser.documentNumber,
        password: this.dataUser.password,
        roles: this.dataUser.roles
      })
      this.tituloAccion = "Editar"
      this.botonAccion = "Actualizar"
    }
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
