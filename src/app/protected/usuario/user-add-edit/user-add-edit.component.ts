import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol, DocumentType, Data } from 'src/app/auth/interfaces/auth.interface';
import { AuthService  } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {

  dt!: string;
  rol!: string;
  roles: Rol[] = [];
  documents: DocumentType[]=[];

  formUsuario: FormGroup;
  tituloAccion: string = "Nuevo";
  botonAccion: string = "Guardar"

  constructor(private dialogoReferencia: MatDialogRef<UserAddEditComponent>, private fb:FormBuilder, private _autService: AuthService, private _document: AuthService,public dialog:MatDialog, @Inject (MAT_DIALOG_DATA)public dataUser:Data | any) {
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
            title: 'se añadio un nuevo usuario'
          })
          this.dialog.closeAll();
        },
        error: (err) =>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.msg,
            footer: '<a href>Why do I have this issue?</a>'
          })
        }
      })
    }else{
      const token: string = localStorage.getItem('token')!;
      this._autService.update(modelo,this.dataUser._id, token).subscribe({
      next: (data)=>{
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
          title: 'se edito el usuario selecionado'
        })
        this.dialog.closeAll();
      },
      error: (err) =>{
        console.log(err)
      }
    })
    }
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
        let rolIndex = this.roles.findIndex((rol) => rol.rol === this.dataUser.roles[0].rol);
        this.rol = this.roles[rolIndex].rol;
      }
    })
  }

  getDocument(token: string){
    this._document.getDocument(token)
    .subscribe({
      next:(data)=>{
        this.documents=data
        let documentTypeIndex = this.documents.findIndex((documentType) => documentType._id === this.dataUser.documentType);
        this.dt = this.documents[documentTypeIndex].type;
      }
    })
  }

}
