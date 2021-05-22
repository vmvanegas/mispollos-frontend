import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  public page = 1
  public list = []
  public editing: boolean = false
  public editingItem: any = {}
  public totalItems = []
  public loading = true;
  public error = false
  public form: FormGroup
  public tableColums = [{ title: "Valor total", field: "valorTotal" }, { title: "Empleado", field: "usuario.nombre" }, { title: "Cliente", field: "cliente.nombre" } , { title: "Fecha", field: "fecha" }]



  constructor(
    public orderService: OrderService, //Objeto instanciado
    private formBuilder: FormBuilder, //Objeto instanciado
    private router: Router
  ) { 
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
    this.getList()
  }

  ngOnInit(): void {
  }

  public sendOrder() {
    if (this.form.valid) {

      if (!this.editing) {

        const employee = {
          IdTienda: JSON.parse(localStorage.getItem('user')).idTienda,
          Nombre: this.form.controls['name'].value,
          Apellido: this.form.controls['lastName'].value,
          Correo: this.form.controls['email'].value,
          Clave: this.form.controls['password'].value,
        }

        this.orderService.create(employee).subscribe(
          res => {
            this.form.reset()
            this.getList()
          },
          err => {
            console.log(err)
          }
        )
      } else {

        const employee = {
          Id: this.editingItem.id,
          IdRol: this.editingItem.idRol,
          IdTienda: JSON.parse(localStorage.getItem('user')).idTienda,
          Nombre: this.form.controls['name'].value,
          Apellido: this.form.controls['lastName'].value,
          Correo: this.form.controls['email'].value,
          Clave: this.form.controls['password'].value,
        }
        
        this.orderService.update(employee).subscribe(
          res => {
            this.editing = false
            this.editingItem = {}
            this.form.reset()
            this.getList()
            console.log("editado?")
          },
          err => {
            console.log(err)
          }
        )
      }
    }
  }


  public getList = () => {
    return this.orderService.get(this.page).subscribe(

       (res:any) =>{
       this.list = res.data
       this.totalItems = new Array(Math.ceil(res.total/10))
       this.error = false
       this.loading = false 
       console.log(this.list);

     },err=>{

       (console.log(err))
       this.loading= false
       this.error = true

     })

  }

  public editItem(employee) {
    this.router.navigate(['administracion/pedidos/editar', employee.id])
  }

  public resetForm() {
    this.form.reset()
  }
}
