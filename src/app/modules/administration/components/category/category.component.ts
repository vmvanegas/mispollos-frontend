import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {


  @ViewChild('myModal') myModal: ElementRef
  @ViewChild('myModalQuestion') myModalQuestion: ElementRef


  public categories = [];//GENERAR FILAS  DINAMICAS
  public page = 1;
  public editing: boolean = false
  public editingCategory: any = {}
  public totalCategories = []
  public idToDelete = ""
  public loading = true;
  public error = false

  categoryForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]]
  })

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private elementRef : ElementRef,
    private userInfo : UserInfoService
    ) { 
      console.clear()
    console.log(this.userInfo.User)
    this.getCategoryList()
  }

  ngOnInit(): void {
  }

  getCategoryList() {
    this.categoryService.get(this.page).subscribe(
      (res: any) => {
        this.categories = res.data
        this.totalCategories = new Array(Math.ceil(res.total / 10))
        console.log(this.categories);
        this.error = false
        this.loading = false;
      },
      err => {
        console.log(err)
        this.loading = false;
        this.error = true
    })
  }

  public sendCategory() {
    if (this.categoryForm.valid) {

      if (!this.editing) {

        const category = {
          Nombre: this.categoryForm.controls['name'].value,
          IdTienda: JSON.parse(localStorage.getItem('user')).idTienda
        }

        this.categoryService.create(category).subscribe(
          res => {
            console.log(res)
            this.categoryForm.reset()
            this.myModal.nativeElement.click();
            this.getCategoryList()
          },
          err => {
            console.log(err)
          }
        )
      } else {

        const category = {
          Id: this.editingCategory.id,
          Nombre: this.categoryForm.controls['name'].value,
          IdTienda: JSON.parse(localStorage.getItem('user')).idTienda
        }

        console.log("editado?")
        this.categoryService.update(category).subscribe(
          res => {
            console.log(res)
            this.editing = false
            this.editingCategory = {}
            this.categoryForm.reset()
            this.myModal.nativeElement.click();
            this.getCategoryList()
          },
          err => {
            console.log(err)
          }
        )
      }
    }
  }

  public setIdToDelete(id) {
    this.idToDelete = id;
  }

  public deleteCategory(id) {
    this.categoryService.delete(id).subscribe(
      res => {
        console.log(res)
        this.idToDelete = "";
        this.myModalQuestion.nativeElement.click()
        this.getCategoryList()
      }, err => {
        console.log(err)
      })

  }



  public editCategory(provider) {
    this.editing = true
    this.editingCategory = provider
    this.categoryForm.patchValue({
      name: provider.nombre
    })
  }


  public changePage(page) {
    this.loading = true
    if (page <= this.totalCategories.length && page > 0) {
      this.page = page
      this.setTableNavigationLinkActive()
      this.categoryService.get(this.page).subscribe(
        (res: any) => {
          this.categories = res.data
          this.loading = false
        },
        err => {
          console.log(err)
          this.loading = false
        }
      )
    }
  }


  setTableNavigationLinkActive() {
    let elements = []
    this.elementRef.nativeElement.querySelectorAll('.page-link').forEach(item => {
      if (item.classList.contains("active")) {
        item.classList.remove("active")
      }
      elements.push(item)
    })
    elements[this.page].classList.add("active")
  }

}
