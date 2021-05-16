import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

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

  productForm: FormGroup = this.formBuilder.group({
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


  public setIdToDelete(id) {
    this.idToDelete = id;
  }

  public deleteProduct(id) {
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



  public editProduct(products) {
    this.editing = true
    this.editingProducts = products
    this.productForm.patchValue({
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
