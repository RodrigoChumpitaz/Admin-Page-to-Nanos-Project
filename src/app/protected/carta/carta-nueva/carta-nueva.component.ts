import { Token } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators,FormControl } from '@angular/forms';
import { CategoriaI } from 'src/app/auth/interfaces/categoria.interface';
import { CartaService } from 'src/app/auth/services/carta.service';
import { CategoriaService } from 'src/app/auth/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carta-nueva',
  templateUrl: './carta-nueva.component.html',
  styleUrls: ['./carta-nueva.component.css']
})
export class CartaNuevaComponent implements OnInit {

  image!: File;
  previsualizacion!: string;
  _mimesTypes: string[]=['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  name!: string;
  description!: string;
  price!: string;
  category!: string;
  categoriaList:CategoriaI[]=[];

  @ViewChild("cartImage") cartImage!: ElementRef<HTMLInputElement>;
  //@ViewChild("category") category2!: ElementRef<HTMLInputElement>;

  constructor(private carta:CartaService,private categoria:CategoriaService) { }

  ngOnInit(): void {
    this.categoria.getAllCategorias()
    .subscribe({

      next: (data) =>{
        this.categoriaList=data
        console.log(data);
      },
      error: (err) => console.log(err)
    })
  }
  get mimeTypes(){
    return [...this._mimesTypes]
  }
  save(){
    const formData = new FormData();
    if(this.image){
      formData.append('cartImage', this.image);
    }
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price' ,this.price);
    formData.append('category', this.category);
    const token: string = localStorage.getItem('token')!;
    console.log(formData.get("name"))
    console.log(formData.get("description"))
    console.log(formData.get("price"))
    console.log(formData.get("category"))
    console.log(formData.get("cartImage"))
    console.log(token)
    this.carta.registrar(formData,token)
    
    .subscribe({
      next: (data) =>{
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
          title: 'se añadio una nueva carta'
        })
        console.log(data);
      },
      error: (err) => console.log(err)
    })

  }
  captar(){
    if(this.cartImage.nativeElement.files![0]){
      this.image = this.cartImage.nativeElement.files![0];
      if(!this.mimeTypes.includes(this.image.type)){
        console.log('El archivo no es una imagen');
        alert('El archivo no es una imagen')
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
