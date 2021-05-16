import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @ViewChild('myModal') myModal: ElementRef
  @ViewChild('myModalQuestion') myModalQuestion: ElementRef


  public orders = [];//GENERAR FILAS  DINAMICAS
  public page = 1;
  public editing: boolean = false
  public editingOrders: any = {}
  public totalOrders = []
  public idToDelete = ""
  public loading = true;
  public error = false

  OrderForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]]
  })

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private elementRef : ElementRef
  ) {
    this.getOrderList()
  }

  ngOnInit(): void {
  }

  getOrderList() {
    this.orderService.getOrders(this.page).subscribe(
      (res: any) => {
        this.orders = res.data
        this.totalOrders = new Array(Math.ceil(res.total / 10))
        console.log(this.orders);
        this.error = false
        this.loading = false;
      },
      err => {
        console.log(err)
        this.loading = false;
        this.error = true
    })
  }

  public sendOrder() {
    if (this.OrderForm.valid) {

      if (!this.editing) {

        const order = {
          Nombre: this.OrderForm.controls['name'].value,
          IdTienda: JSON.parse(localStorage.getItem('user')).idTienda
        }

        this.orderService.createOrder(order).subscribe(
          res => {
            console.log(res)
            this.OrderForm.reset()
            this.myModal.nativeElement.click();
            this.getOrderList()
          },
          err => {
            console.log(err)
          }
        )
      } else {

        const order = {
          Id: this.editingOrders.id,
          Nombre: this.OrderForm.controls['name'].value,
          IdTienda: JSON.parse(localStorage.getItem('user')).idTienda
        }

        console.log("editado?")
        this.orderService.updateOrder(order).subscribe(
          res => {
            console.log(res)
            this.editing = false
            this.editingOrders = {}
            this.OrderForm.reset()
            this.myModal.nativeElement.click();
            this.getOrderList()
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

  public deleteOrder(id) {
    this.orderService.deleteOrder(id).subscribe(
      res => {
        console.log(res)
        this.idToDelete = "";
        this.myModalQuestion.nativeElement.click()
        this.getOrderList()
      }, err => {
        console.log(err)
      })

  }



  public editOrder(provider) {
    this.editing = true
    this.editingOrders = provider
    this.OrderForm.patchValue({
      name: provider.nombre
    })
  }


  public changePage(page) {
    this.loading = true
    if (page <= this.totalOrders.length && page > 0) {
      this.page = page
      this.setTableNavigationLinkActive()
      this.orderService.getOrders(this.page).subscribe(
        (res: any) => {
          this.orders = res.data
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
