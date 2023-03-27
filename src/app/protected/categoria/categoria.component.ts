import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoriaI,Cat } from 'src/app/auth/interfaces/categoria.interface';
import { CategoriaService } from 'src/app/auth/services/categoria.service';
import { CategoriaEditComponent } from './categoria-edit/categoria-edit.component';
import { CategoriaNuevaComponent } from './categoria-nueva/categoria-nueva.component';

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
      width: '750px',
      height: '450px'

    });
    this.getAllCategorias();
  }

  editarcategoria(dataCat:Cat){
    this.dialog.open(CategoriaEditComponent,{
        width: '750px',
        height: '450px',
        data: dataCat
    })
  }

  inactiveCategoria(dataCat: Cat){
    this._categoriaService.changeAvailable(this.token, dataCat._id)
      .subscribe({
        next: (rs) =>{
          const url= self ? this.router.url : '/admin/categoria';
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
