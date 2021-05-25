import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  @ViewChild('myModal') public myModal: ElementRef;

  public page = 1
  public list = []
  public editing: boolean = false
  public editingItem: any = {}
  public totalItems = []
  public loading = true;
  public error = false
  public form: FormGroup
  public tableColums = [{ title: "Nombre", field: "nombre" }, { title: "Apellido", field: "apellido" }, { title: "Correo", field: "correo" }]



  constructor(
    public employeeService: UserService, //Objeto instanciado
    private formBuilder: FormBuilder, //Objeto instanciado
  ) {
    this.form = this.formBuilder.group({///Validaciones de formulario empleados
      name: ['', [Validators.required,Validators.maxLength(40),Validators.name,Validators.pattern("/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/")]],
      lastName: ['', [Validators.required,Validators.maxLength(40),Validators.name,Validators.pattern("/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/")]],
      email: ['', [Validators.required,Validators.maxLength(60),Validators.email]],
      password: ['', [Validators.required,Validators.maxLength(16),Validators.minLength(8),Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$")]]
    })
    this.getList()
  }

  ngOnInit(): void {
  }

  get employeeForm(){

    return this.form.controls

  }

  public sendEmployee() {
    if (this.form.valid) {

      if (!this.editing) {

        const employee = {
          IdTienda: JSON.parse(localStorage.getItem('user')).idTienda,
          Nombre: this.form.controls['name'].value,
          Apellido: this.form.controls['lastName'].value,
          Correo: this.form.controls['email'].value,
          Clave: this.form.controls['password'].value,
        }

        this.employeeService.create(employee).subscribe(
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

        const employee = {
          Id: this.editingItem.id,
          IdRol: this.editingItem.idRol,
          IdTienda: JSON.parse(localStorage.getItem('user')).idTienda,
          Nombre: this.form.controls['name'].value,
          Apellido: this.form.controls['lastName'].value,
          Correo: this.form.controls['email'].value,
          Clave: this.form.controls['password'].value,
        }

        this.employeeService.update(employee).subscribe(
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
    return this.employeeService.get(this.page).subscribe(

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
    this.editing = true
    this.editingItem = employee
    this.form.patchValue({
      name: employee.nombre,
      lastName: employee.apellido,
      email: employee.correo,
      password: employee.clave,
    })
  }

  public resetForm() {
    this.form.reset()
  }

}
