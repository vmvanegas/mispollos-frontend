import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {


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
      name: ["", [Validators.required]],
      category: ["", [Validators.required]],
      price: ["", [Validators.required]],
      provider: ["", [Validators.required]],
      dueDate: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      description: ["", [Validators.required]],
    })

    const productId = this.activatedRoute.snapshot.paramMap.get('id');

    if(productId){
      this.getProduct(productId).subscribe(res => {
        console.log("getproduct")
        
        this.productForm.patchValue({
          name: this.editingProduct.nombre,
          category: this.editingProduct.idCategoria,
          price: this.editingProduct.precio,
          provider: this.editingProduct.idProveedor,
          dueDate: this.editingProduct.fechaVencimiento,
          quantity: this.editingProduct.stock,
          description: this.editingProduct.descripcion,
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
        this.providerList = res.data
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
        this.categoryList = res.data
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
          Descripcion: this.productForm.controls['description'].value,
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
          Descripcion: this.productForm.controls['description'].value,
          Stock: this.productForm.controls['quantity'].value,
          FechaVencimiento: this.productForm.controls['dueDate'].value,
          Precio: this.productForm.controls['price'].value
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
