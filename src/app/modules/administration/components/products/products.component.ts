import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild('myModal') myModal: ElementRef
  @ViewChild('myModalQuestion') myModalQuestion: ElementRef


  public products = [];//GENERAR FILAS  DINAMICAS
  public page = 1;
  public editing: boolean = false
  public editingProducts: any = {}
  public totalProducts = []
  public idToDelete = ""
  public loading = true;
  public error = false

  productsForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]]
  })

  constructor(
    private productsService: ProductService,
    private formBuilder: FormBuilder,
    private elementRef : ElementRef
  ) {
    this.getProductsList()
  }

  ngOnInit(): void {
  }

  getProductsList() {
    this.productsService.getProducts(this.page).subscribe(
      (res: any) => {
        this.products = res.data
        this.totalProducts = new Array(Math.ceil(res.total / 10))
        console.log(this.products);
        this.error = false
        this.loading = false;
      },
      err => {
        console.log(err)
        this.loading = false;
        this.error = true
    })
  }

  public sendProducts() {
    if (this.productsForm.valid) {

      if (!this.editing) {

        const products = {
          Nombre: this.productsForm.controls['name'].value,
          IdTienda: JSON.parse(localStorage.getItem('user')).idTienda
        }

        this.productsService.createProduct(products).subscribe(
          res => {
            console.log(res)
            this.productsForm.reset()
            this.myModal.nativeElement.click();
            this.getProductsList()
          },
          err => {
            console.log(err)
          }
        )
      } else {

        const products = {
          Id: this.editingProducts.id,
          Nombre: this.productsForm.controls['name'].value,
          IdTienda: JSON.parse(localStorage.getItem('user')).idTienda
        }

        console.log("editado?")
        this.productsService.updateProduct(products).subscribe(
          res => {
            console.log(res)
            this.editing = false
            this.editingProducts = {}
            this.productsForm.reset()
            this.myModal.nativeElement.click();
            this.getProductsList()
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

  public deleteProducts(id) {
    this.productsService.deleteProduct(id).subscribe(
      res => {
        console.log(res)
        this.idToDelete = "";
        this.myModalQuestion.nativeElement.click()
        this.getProductsList()
      }, err => {
        console.log(err)
      })

  }



  public editProducts(products) {
    this.editing = true
    this.editingProducts = products
    this.productsForm.patchValue({
      name: products.nombre
    })
  }


  public changePage(page) {
    this.loading = true
    if (page <= this.totalProducts.length && page > 0) {
      this.page = page
      this.setTableNavigationLinkActive()
      this.productsService.getProducts(this.page).subscribe(
        (res: any) => {
          this.products = res.data
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
