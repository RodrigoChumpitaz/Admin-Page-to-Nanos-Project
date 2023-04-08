import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoriaI,Cat } from 'src/app/auth/interfaces/categoria.interface';
import { CategoriaService } from 'src/app/auth/services/categoria.service';
import { CategoriaEditComponent } from './categoria-edit/categoria-edit.component';
import { CategoriaNuevaComponent } from './categoria-nueva/categoria-nueva.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  nombrecategoria:string=''
  filtercategoria?:string

  token: string = localStorage.getItem('token')!
  progress = 0;
  showData = false;
  displayedColumns: string[] = ['description','imgUrl','state','acciones'];
  dataSource!: MatTableDataSource<CategoriaI>;

  constructor(private _categoriaService: CategoriaService,private router:Router,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.getAllCategorias();
  }

  getAllCategorias(){
    this._categoriaService.getAllCategorias()
    .subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.progress = 100;
    })
  }

  nuevaCategoria(){
    this.dialog.open(CategoriaNuevaComponent,{
      width: '500px',
      height: '450px'

    });
    this.getAllCategorias();
  }

  editarcategoria(dataCat:Cat){
    this.dialog.open(CategoriaEditComponent,{
        width: '500px',
        height: '450px',
        data: dataCat
    })
  }

  inactiveCategoria(dataCat: Cat){
    this._categoriaService.changeAvailable(this.token, dataCat._id)
      .subscribe({
        next: (rs:any) =>{
          const url= self ? this.router.url : '/admin/categoria';
          if(rs.message==="Category inactivated"){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast.fire({
              icon: 'error',
              title: 'se deshabilito la categoria seleccionada',
            })
          }else{
            const Toast1 = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast1.fire({
              icon: 'info',
              title: 'se habilito la categoria seleccionada',
            })
          }
          
          this.router.navigateByUrl('/',{skipLocationChange:true}).then( async ()=>{
            await this.router.navigate([`/${url}`])
          })
        },
        error: (err: any) => console.log(err.headers)
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getState(state: boolean){
    if(state){
      return 'paid'
    }else{
      return 'invalid'
    }
  }
  

}
