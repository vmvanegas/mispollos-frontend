import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ProviderService } from '../../services/provider.service';
import { setValidationDates } from 'src/app/utils/setValidationDate';
import { dateValidator } from 'src/app/utils/dateValidation';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @ViewChild('myDate') myDate: ElementRef

  editing = false
  editingProduct: any = {}


  providerList = []
  categoryList = []


  public productForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private providerService: ProviderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(100)]],
      category: ["", [Validators.required, Validators.maxLength(60)]],
      price: ["", [Validators.required, Validators.maxLength(120)]],
      provider: ["", [Validators.required, Validators.maxLength(60)]],
      dueDate: ["", [Validators.required, Validators.maxLength(60), dateValidator]],
      quantity: ["", [Validators.required, Validators.maxLength(60)]]
      /* description: ["", [Validators.required, Validators.maxLength(120)]], */
    })

    const productId = this.activatedRoute.snapshot.paramMap.get('id');

    if(productId){
      this.getProduct(productId).subscribe(res => {
        
        this.productForm.patchValue({
          name: this.editingProduct.nombre,
          category: this.editingProduct.idCategoria,
          price: this.editingProduct.precio,
          provider: this.editingProduct.idProveedor,
          dueDate: this.editingProduct.fechaVencimiento,
          quantity: this.editingProduct.stock
          /* description: this.editingProduct.descripcion, */
        })

        this.getProviderList()
      })
    }
    else {
      this.getProviderList()
    }
    
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    let min = new Date(Date.now())
    setValidationDates(this.myDate.nativeElement,min, "min")
  }

  get f() {
    return this.productForm.controls
  }

  getProduct(id) {
    return new Observable(observer => {
      this.productService.getById(id).subscribe(
        (res: any)=>{
          this.editingProduct = res
          this.editing = true
          observer.next()
        }, err=>{console.log(err)})
    })
  }

  getProviderList() {
    this.providerService.getList().subscribe(
      (res :any) => {
        this.providerList = res
        this.getCategoryList()
      }, 
      err => {
        console.log(err)
      }
    )
  }

  getCategoryList() {
    this.categoryService.getList().subscribe(
      (res :any) => {
        this.categoryList = res
      }, 
      err => {
        console.log(err)
      }
    )
  }

  public sendProduct() {
    if (this.productForm.valid) {

      if (!this.editing) {

        const product = {
          IdTienda: JSON.parse(localStorage.getItem('user')).idTienda,
          IdCategoria: this.productForm.controls['category'].value,
          IdProveedor: this.productForm.controls['provider'].value,
          Nombre: this.productForm.controls['name'].value,
          /* Descripcion: this.productForm.controls['description'].value, */
          Stock: this.productForm.controls['quantity'].value,
          FechaVencimiento: this.productForm.controls['dueDate'].value,
          Precio: this.productForm.controls['price'].value
        }

        this.productService.create(product).subscribe(
          res => {
            this.productForm.reset()
            this.router.navigate(['administracion/productos'])
          },
          err => {
            console.log(err)
          }
        )
      } else {

        const product = {
          Id: this.editingProduct.id,
          IdTienda: this.editingProduct.idTienda,
          IdCategoria: this.productForm.controls['category'].value,
          IdProveedor: this.productForm.controls['provider'].value,
          Nombre: this.productForm.controls['name'].value,
          /* Descripcion: this.productForm.controls['description'].value, */
          Stock: this.productForm.controls['quantity'].value,
          FechaVencimiento: this.productForm.controls['dueDate'].value,
          Precio: this.productForm.controls['price'].value,
          CreatedOn: this.editingProduct.createdOn
        }

        this.productService.update(product).subscribe(
          res => {
            this.editing = false
            this.editingProduct = {}
            this.productForm.reset()
            this.router.navigate(['administracion/productos'])
          },
          err => {
            console.log(err)
          }
        )
      }      
    }
  }

}
