import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators,FormControl } from '@angular/forms';
import { CategoriaI } from 'src/app/auth/interfaces/categoria.interface';
import { CategoriaService } from 'src/app/auth/services/categoria.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-categoria-nueva',
  templateUrl: './categoria-nueva.component.html',
  styleUrls: ['./categoria-nueva.component.css']
})
export class CategoriaNuevaComponent implements OnInit {

  image!: File;
  previsualizacion!: string;
  _mimesTypes: string[]=['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  description!: string

  @ViewChild("categoryImage") categoryImage!: ElementRef<HTMLInputElement>;

  constructor(private _categoriaService: CategoriaService, public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  get mimeTypes(){
    return [...this._mimesTypes]
  }

  save(){
    const formData = new FormData();
    if(this.image){
      formData.append('categoryImage', this.image);
    }
    formData.append('description', this.description);
    const token: string = localStorage.getItem('token')!;
    this._categoriaService.registrar(formData,token)
    .subscribe({
      next: (data: any) =>{
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
          title: data.msg
        })
        this.dialog.closeAll();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message,
        })
        console.log(err)
      }
    })
  }

  captar(){
    if(this.categoryImage.nativeElement.files![0]){
      this.image = this.categoryImage.nativeElement.files![0];
      if(!this.mimeTypes.includes(this.image.type)){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El archivo no es una imagen',
        })
        this.categoryImage.nativeElement.value = '';
        return
      }
      this.extractBase64(this.image)
      .then((data:any)=>{
        this.previsualizacion= data.data;
      })

    }
  }

  extractBase64 = async (file: File) => new Promise((resolve, reject) =>{
    try {
      const unsaveImage = window.URL.createObjectURL(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve({
          data: reader.result,
        })
      }
      reader.onerror = error =>{
        reject({
          data: null
        })
      }
    } catch (error) {
      reject(error)
    }
  })

}
