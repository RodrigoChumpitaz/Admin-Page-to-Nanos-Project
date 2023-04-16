import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { DistritoResponse } from 'src/app/auth/interfaces/distrito.interface';
import { Distrito, RegistrarlocalI } from 'src/app/auth/interfaces/local.interface';
import { LocalService } from 'src/app/auth/services/local.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-local-add-edit',
  templateUrl: './local-add-edit.component.html',
  styleUrls: ['./local-add-edit.component.css']
})
export class LocalAddEditComponent implements OnInit {
  control = new FormControl();
  districts: any []=[];
  filteredOptions!: Observable<string[]>;

  formLocal: FormGroup;
  tituloAccion: string = "Nuevo";
  botonAccion: string = "Guardar"

  selectedOption!: string;

  constructor(private dialogoReferencia: MatDialogRef<LocalAddEditComponent>, private fb:FormBuilder, private _localServicio: LocalService, @Inject (MAT_DIALOG_DATA)public dataLocal:RegistrarlocalI) {
    this.formLocal = this.fb.group({
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      distrito: ['', Validators.required]
    })
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

   private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.districts.filter(option => option.name.toLowerCase().includes(filterValue));
   }

   addEditLocal(){
    console.log(this.formLocal.value)
    const modelo: RegistrarlocalI = {
      _id: this.formLocal.value.id,
      telefono: this.formLocal.value.telefono,
      direccion: this.formLocal.value.direccion,
      distrito: this.formLocal.value.distrito,
    }
    const token: string = localStorage.getItem('token')!;
    if(this.dataLocal == null){

      this._localServicio.registrar(modelo,token).subscribe({
      next: (data)=>{
        console.log(data)
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
          title: 'se añadio un nuevo local'
        })
      }
    })
   }else{
      const token: string = localStorage.getItem('token')!;
      console.log(this.dataLocal);
      this._localServicio.update(modelo,this.dataLocal._id, token).subscribe({
      next: (data)=>{
        console.log(data)
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
          title: 'se edito el local selecionado'
        })
      },
      error: (err) =>{
        console.log(err)
      }

    })
   }
}

  ngOnInit(): void {
    this.getDistrict(localStorage.getItem('token')!);
    if(this.dataLocal){
      this.formLocal.patchValue({
        id: this.dataLocal._id,
        telefono: this.dataLocal.telefono,
        direccion: this.dataLocal.direccion,
        distrito: this.dataLocal.distrito,
    })
      this.tituloAccion = "Editar"
      this.botonAccion = "Actualizar"
    }
  }

  getDistrict(token: string){
    this._localServicio.getDistricts(token)
    .subscribe({
      next: (data)=>{
        this.districts=data
        let distritoIndex = this.districts.findIndex((distrito: any) => distrito.nombre === this.dataLocal.distrito.name);
        this.selectedOption = this.districts[distritoIndex].nombre
      }
    })
  }
}
