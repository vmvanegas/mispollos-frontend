import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public categories = [];//GENERAR FILAS  DINAMICAS
  public page = 1;
  constructor(
    private categoryService:CategoryService

  ) { }

  ngOnInit(): void {
  }

  getCategoryList(){
    this.categoryService.getCategories(this.page).subscribe((res:any) =>{
     this.categories = res.data
     console.log(this.categories);
    },err=>{console.log(err)})


  }

}
