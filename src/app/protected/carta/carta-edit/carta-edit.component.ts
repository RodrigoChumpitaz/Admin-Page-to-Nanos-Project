import { Component, ElementRef, OnInit, ViewChild,Inject } from '@angular/core';
import { Cart } from 'src/app/auth/interfaces/carta.interface';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaI } from 'src/app/auth/interfaces/categoria.interface';
import { CartaService } from 'src/app/auth/services/carta.service';
import { CategoriaService } from 'src/app/auth/services/categoria.service';
import { FormBuilder, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-carta-edit',
  templateUrl: './carta-edit.component.html',
  styleUrls: ['./carta-edit.component.css']
})
export class CartaEditComponent implements OnInit {
  control = new FormControl();
  filteredOptions: Observable<string[]>;
  token: string = localStorage.getItem('token')!
  image!: File;
  selectedOption!: string;
  previsualizacion!: string;
  _mimesTypes: string[]=['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  categoriaList:any[]=[];
  formularioEdit = this.fb.group({
    "_id":[""],
    "name": [""],
    "description": [""],
    "price": [""],
    "category": [""],
  });


  @ViewChild("cartImage") cartImage!: ElementRef<HTMLInputElement>;
  // @ViewChild("category1") category1!: ElementRef<HTMLInputElement> | any;


  constructor(private cartaService :CartaService,private categoriaService :CategoriaService,
    @Inject(MAT_DIALOG_DATA) public dataCart: Cart, private fb: FormBuilder, public dialog: MatDialog) {
      this.filteredOptions = this.control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.categoriaList.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  get mimeTypes(){
    return [...this._mimesTypes]
  }


  modificar(){
    const formData = new FormData();
    if(this.image){
      formData.append('cartImage', this.image);
    }
    formData.append('id', this.formularioEdit.value._id as any)
    formData.append('name', this.formularioEdit.value.name as any);
    formData.append('description', this.formularioEdit.value.description as any);
    formData.append('price' , this.formularioEdit.value.price as any);
    formData.append('category', this.formularioEdit.value.category as any);
    // console.log(this.category1._elementRef.nativeElement.outerText)
    // console.log(this.category1)
    // console.log(this.category1._value.name)
    console.log(this.formularioEdit.value._id);
    this.cartaService.editar(formData,this.token)
      .subscribe({
        next: (rs: any) => {
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
            title: rs.message
          })
          this.dialog.closeAll();
        },
        error: err => console.log(err)
      })

  }
  captar(){
    if(this.cartImage.nativeElement.files![0]){
      this.image = this.cartImage.nativeElement.files![0];
      if(!this.mimeTypes.includes(this.image.type)){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El archivo no es una imagen',
        })
        this.cartImage.nativeElement.value = '';
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
    if(this.dataCart){
      this.formularioEdit.patchValue({
        _id: this.dataCart._id,
        name: this.dataCart.name,
        description: this.dataCart.description,
        price: this.dataCart.price,
        category: this.dataCart.category
      })
      this.selectedOption = this.dataCart.category.name;
    }
    this.categoriaService.getAllCategorias()
    .subscribe({
      next: (data) =>{
        this.categoriaList=data
      },
      error: (err) => console.log(err)
    })
  }

}
