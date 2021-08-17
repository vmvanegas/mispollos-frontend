import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  @ViewChild('myModal') myModal: ElementRef
  @ViewChild('myModalQuestion') myModalQuestion: ElementRef


  public list = [];//GENERAR FILAS  DINAMICAS
  public page = 1;
  public editing: boolean = false
  public editingProducts: any = {}
  public totalItems = []
  public idToDelete = ""
  public loading = true;
  public error = false
  public tableColums = [{ title: "Nombre", field: "nombre" }, { title: "Categoria", field: "categoria.nombre" }, { title: "Precio", field: "precio" }, { title: "Proveedor", field: "proveedor.nombre" }, { title: "Fecha de vencimiento", field: "fechaVencimiento" }, { title: "Cantidad", field: "stock" }]


  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]]
  })

  constructor(
    public productsService: ProductService,
    private formBuilder: FormBuilder,
    private elementRef : ElementRef,
    private userInfo : UserInfoService,
    private router: Router
  ) {
    console.log(this.userInfo.User)
    this.getProductsList()
  }

  ngOnInit(): void {
  }

  getProductsList() {
    this.productsService.get(this.page).subscribe(
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

  editItem(event){
    console.log(event.id)
    this.router.navigate(['/administracion/productos/editar', event.id])
  }


  public setIdToDelete(id) {
    this.idToDelete = id;
  }

  public deleteProduct(id) {
    this.productsService.delete(id).subscribe(
      res => {
        console.log(res)
        this.idToDelete = "";
        this.myModalQuestion.nativeElement.click()
        this.getProductsList()
      }, err => {
        console.log(err)
      })

  }


  public changePage(page) {
    this.loading = true
    if (page <= this.totalItems.length && page > 0) {
      this.page = page
      this.setTableNavigationLinkActive()
      this.productsService.get(this.page).subscribe(
        (res: any) => {
          this.list = res.data
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
