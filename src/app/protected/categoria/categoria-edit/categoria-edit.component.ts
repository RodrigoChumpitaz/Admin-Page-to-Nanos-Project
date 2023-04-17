import { Component, OnInit,  ElementRef, ViewChild,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { CategoriaService } from 'src/app/auth/services/categoria.service';
import { Cat } from 'src/app/auth/interfaces/categoria.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})
export class CategoriaEditComponent implements OnInit {

  token: string = localStorage.getItem('token')!
  image!: File;
  previsualizacion!: string;
  _mimesTypes: string[]=['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  formularioEdit = this.fb.group({
    "slug":[""],
    "description": [""],
  });

  @ViewChild("categoryImage") categoryImage!: ElementRef<HTMLInputElement>;

  constructor(private _categoriaService: CategoriaService,public dialog:MatDialog, @Inject(MAT_DIALOG_DATA) public dataCat: Cat, private fb: FormBuilder) {
  }

  get mimeTypes(){
    return [...this._mimesTypes]
  }



  modificar(){
    const formData = new FormData();
    if(this.image){
      formData.append('categoryImage', this.image);
    }
    formData.append('slug', this.formularioEdit.value.slug as any);
    formData.append('description', this.formularioEdit.value.description as any);
    console.log(this.formularioEdit.value.slug);
    this._categoriaService.editar(formData,this.dataCat.slug,this.token)
      .subscribe({
        next: (rs) => {
          console.log(rs);
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
            title: 'Se editó la Categoria Seleccionada'
          })
          this.dialog.closeAll();
        },
        error: err => console.log(err)
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

  ngOnInit(): void {
    if(this.dataCat){
      this.formularioEdit.patchValue({
        description: this.dataCat.description,
        slug: this.dataCat.slug,
      })
    }
  }

}
