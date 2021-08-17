import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  @ViewChild('myModal') public myModal: ElementRef;

  public page = 1
  public list = []
  public editing: boolean = false
  public editingItem: any = {}
  public totalItems = []
  public loading = true;
  public error = false
  public form: FormGroup
  public tableColums = [{ title: "Nombre", field: "nombre" }, { title: "Apellido", field: "apellido" }, { title: "Teléfono", field: "telefono" }, { title: "Correo", field: "correo" }]



  constructor(
    public customerService: CustomerService, //Objeto instanciado
    private formBuilder: FormBuilder, //Objeto instanciado
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(60)]],
      lastName: ['', [Validators.required, Validators.maxLength(60) ]],
      email: ['', [Validators.required, Validators.maxLength(60), Validators.email ]],
      telephone: ['', [Validators.required, Validators.maxLength(30)]],
    })
    this.getList()
  }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls
  }


  public sendCustomer() {
    if (this.form.valid) {

      if (!this.editing) {

        const customer = {
          IdTienda: JSON.parse(localStorage.getItem('user')).idTienda,
          Nombre: this.form.controls['name'].value,
          Apellido: this.form.controls['lastName'].value,
          Telefono: this.form.controls['telephone'].value,
          Correo: this.form.controls['email'].value
        }

        this.customerService.create(customer).subscribe(
          res => {
            this.form.reset()
            this.myModal.nativeElement.click();
            this.getList()
          },
          err => {
            console.log(err)
          }
        )
      } else {

        const customer = {
          Id: this.editingItem.id,
          IdTienda: JSON.parse(localStorage.getItem('user')).idTienda,
          Nombre: this.form.controls['name'].value,
          Apellido: this.form.controls['lastName'].value,
          Telefono: this.form.controls['telephone'].value,
          Correo: this.form.controls['email'].value,
          CreatedOn: this.editingItem.createdOn          
        }

        this.customerService.update(customer).subscribe(
          res => {
            this.editing = false
            this.editingItem = {}
            this.form.reset()
            this.myModal.nativeElement.click();
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
    return this.customerService.get(this.page).subscribe(

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

  public editItem(customer) {
    this.editing = true
    this.editingItem = customer
    this.form.patchValue({
      name: customer.nombre,
      lastName: customer.apellido,
      telephone: customer.telefono,
      email: customer.correo
    })
  }

  public resetForm() {
    this.editing = false
    this.form.reset()
  }

}
