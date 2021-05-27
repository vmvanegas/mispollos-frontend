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


  public list = [];//GENERAR FILAS  DINAMICAS
  public page = 1;
  public editing: boolean = false
  public editingCategory: any = {}
  public totalItems = []
  public idToDelete = ""
  public loading = true;
  public error = false
  public tableColums = [{ title: "Id", field: "id" }, { title: "Nombre", field: "nombre" }]

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(40)]]
  })

  constructor(
    public categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private elementRef : ElementRef,
    private userInfo : UserInfoService
    ) { 
      console.clear()
    console.log(this.userInfo.User)
    this.getList()
  }

  get f() {
    return this.form.controls
  }


  ngOnInit(): void {
  }

  getList() {
    this.categoryService.get(this.page).subscribe(
      (res: any) => {
        this.list = res.data
        this.totalItems = new Array(Math.ceil(res.total / 10))
        console.log(this.list);
        this.error = false
        this.loading = false;
      },
      err => {
        console.log(err)
        this.loading = false;
        this.error = true
    })
  }

  public sendItem() {
    if (this.form.valid) {

      if (!this.editing) {

        const category = {
          Nombre: this.form.controls['name'].value,
          IdTienda: JSON.parse(localStorage.getItem('user')).idTienda
        }

        this.categoryService.create(category).subscribe(
          res => {
            console.log(res)
            this.form.reset()
            this.myModal.nativeElement.click();
            this.getList()
          },
          err => {
            console.log(err)
          }
        )
      } else {

        const category = {
          Id: this.editingCategory.id,
          Nombre: this.form.controls['name'].value,
          IdTienda: JSON.parse(localStorage.getItem('user')).idTienda
        }

        console.log("editado?")
        this.categoryService.update(category).subscribe(
          res => {
            console.log(res)
            this.editing = false
            this.editingCategory = {}
            this.form.reset()
            this.myModal.nativeElement.click();
            this.getList()
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
        this.getList()
      }, err => {
        console.log(err)
      })

  }


  public editItem(provider) {
    this.editing = true
    this.editingCategory = provider
    this.form.patchValue({
      name: provider.nombre
    })
  }


  resetModalForm() {
    this.editing = false
    this.form.reset()
  }

}
