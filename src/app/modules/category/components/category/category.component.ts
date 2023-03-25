import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  //se hace para obtener los metodos de categoryService
  constructor(private categoryServices: CategoryService,
              public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void { //ciclo de vida
    this.getCategories()
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions']
  dataSource = new MatTableDataSource<CategoryElement>()

  //consumimos el servicio, nos siscribimos para obenter la respuesta de getCategories
  getCategories(){
    this.categoryServices.getCategories().subscribe( data => {
          console.log("Respuesta categories: ", data)
          this.processCategoriesResponse(data)
        }), ((error: any) => {
          console.log("error: ", error)
        })
  }

  processCategoriesResponse(resp: any){
    const dataCategory: CategoryElement[] = []

    if(resp.metadata[0].code == "00"){
      let listCategory = resp.categoryResponse.category

      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element)
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory)
    }
  }

  openCategoryDialog(){
    const dialogRef = this.dialog.open(NewCategoryComponent , {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 1){
        this.openSnackBar("Categoria agregada", "Exitosa")
        this.getCategories()
      }else if(result == 2){
        this.openSnackBar("Se produjo un error al guardar la categoria", "Error")
      }
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  edit(id: number, name: string, description: string){
    const dialogRef = this.dialog.open(NewCategoryComponent , {
      width: '450px',
      data: {id: id, name: name, description: description} //enviamos info entre componentes
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 1){
        this.openSnackBar("Categoria actualizada", "Exitosa")
        this.getCategories()
      }else if(result == 2){
        this.openSnackBar("Se produjo un error al actualizar la categoria", "Error")
      }
    });
  }

  delete(id: any){
    const dialogRef = this.dialog.open(ConfirmComponent , {
      //width: '450px',
      data: {id: id} //enviamos info entre componentes
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 1){
        this.openSnackBar("Categoria eliminada", "Exitosa")
        this.getCategories()
      }else if(result == 2){
        this.openSnackBar("Se produjo un error al eliminar la categoria", "Error")
      }
    });
  }
}

export interface CategoryElement {
  description: String;
  id: number;
  name: String;
}
