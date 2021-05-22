import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { QuantityValidator } from '../../../../utils/hasStock'

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  @ViewChild('myModal') public myModal: ElementRef;

  public page = 1
  public list = []
  public editing: boolean = false
  public editingItem: any = {}
  public totalItems = []
  public loading = true;
  public form: FormGroup
  public itemForm: FormGroup

  public customersList = []
  public productsList = []

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService,
    private customerService: CustomerService,
    private router: Router,
    private quantityValidator: QuantityValidator
  ) {


    this.form = this.formBuilder.group({
      customer: ['', [Validators.required]]
    })

    this.itemForm = this.formBuilder.group({
      product: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    }, {asyncValidators: quantityValidator.validate})

    this.getCustomers()

  }

  ngOnInit(): void {
  }

  getCustomers() {
    this.customerService.getList().subscribe(
      (res: any) => {
        this.customersList = res.data
        this.getProducts()
      },
      err => {
        console.log(err)
      })
  }

  getProducts() {
    this.productService.getList().subscribe(
      (res: any) => {
        this.productsList = res.data
      },
      err => {
        console.log(err)
      })
  }

  send() {
    if(this.form.valid) {
      if(this.list != []) {

        const { customer } = this.form.controls
        const userId = JSON.parse(localStorage.getItem('user')).id

        let productList = []
  

        this.list.forEach(element => {
          const productItem = {
            IdProducto: element.id,
            Cantidad: element.quantity
          }
          productList.push(productItem)
          console.log("item " + productList)
        });

        const order = {
          IdUsuario: userId,
          IdCliente: customer.value,
          ListaProductos: productList
        }

        console.log(order)
        
        this.orderService.create(order).subscribe(
          res=>{
            this.form.reset()
            this.list = []
            this.router.navigate(['/administracion/pedidos'])
            
          }, 
          err=>{
            console.log(err)
          })
      }
    }
  }


  addItem() {
    console.log(this.itemForm)
    if (this.itemForm.valid) {

      const { quantity, product } = this.itemForm.controls
      // Busca el producto escogido por el usuario en el array para traer toda su informacion
      const productFromList: any = this.productsList.find(productFromList => productFromList.id == product.value);

      const item = {
        id: productFromList.id,
        name: productFromList.nombre,
        price: productFromList.precio,
        quantity: quantity.value
      }

      // Verifica si el producto que se va a añadir ya existe en la lista
      const repeatedProduct = this.list.findIndex(product => product.id == item.id)
      console.log(repeatedProduct)
      // en caso de que no este repetido añade un nuevo item a la lista
      if(repeatedProduct == -1){  
        this.list.push(item)        
      } else {
        // En caso de que el item ya exista solo le suma la cantidad digitada por el usuario 
        this.list[repeatedProduct].quantity += item.quantity
      }

      
      this.itemForm.reset()
      this.myModal.nativeElement.click()
    }
  }

}
