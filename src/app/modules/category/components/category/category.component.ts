import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  //se hace para obtener los metodos de categoryService
  constructor(private categoryServices: CategoryService) { }

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
}

export interface CategoryElement {
  description: String;
  id: number;
  name: String;
}
