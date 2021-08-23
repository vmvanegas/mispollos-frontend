import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  @ViewChild('activeBar') activeBar: ElementRef
  @ViewChild('myModal') myModal: ElementRef

  public form: FormGroup
  public idUser
  public user

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.idUser = JSON.parse(localStorage.getItem("user")).id
    this.getInfo()
    this.form = formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(40), Validators.minLength(2), Validators.pattern("[a-zA-Z ]{0,}")]],
      lastName: ["", [Validators.required, Validators.maxLength(40), Validators.minLength(2), Validators.pattern("[a-zA-Z ]{0,}")]],
      email: ["", [Validators.required, Validators.maxLength(60), Validators.email]],
      storeName: ["", [Validators.required, Validators.maxLength(60), Validators.pattern("[a-zA-Z ]{0,}")]],
      telephone: ["", [Validators.required, Validators.maxLength(60)]],
      address: ["", [Validators.required, Validators.maxLength(20)]]
    })

  }

  ngOnInit(): void {

  }

  get f() {
    return this.form.controls
  }

  ngAfterViewInit() {
    this.initializeTab()
  }

  initializeTab() {
    console.log("resize D:")
    let activeTab = <any>document.querySelector(".tab.active")
    this.activeBar.nativeElement.style.width = activeTab.offsetWidth + "px"
    this.activeBar.nativeElement.style.left = activeTab.offsetLeft + "px"
  }

  setTabActive(e, elementToActive) {
    let element = e.target
    let tabs = <any>document.querySelectorAll(".tab")
    tabs.forEach(tab => {
      tab.classList.remove("active")
    });
    element.classList.add("active")
    this.activeBar.nativeElement.style.width = element.offsetWidth + "px"
    this.activeBar.nativeElement.style.left = element.offsetLeft + "px"

    let sections = <any>document.querySelectorAll(".info")
    sections.forEach(section => {
      section.classList.remove("active")
    });

    elementToActive.classList.add("active")
  }

  getInfo() {
    this.userService.getById(this.idUser).subscribe(
      (res: any) => {
        this.user = res
        console.log(this.user)
        this.form.setValue({
          name: this.user.nombre,
          lastName: this.user.apellido,
          email: this.user.correo,
          storeName: this.user.tienda.nombre,
          telephone: this.user.tienda.telefono,
          address: this.user.tienda.direccion
        })
      },
      err => {
        console.log(err)
      })
  }


  send() {
    if(this.form.valid){

      if(this.user.rol.nombre == "Admin") {
        const user = {
          Id: this.user.id,
          IdRol: this.user.idRol,
          IdTienda: this.user.idTienda,
          Nombre: this.form.controls['name'].value,
          Apellido: this.form.controls['lastName'].value,
          Correo: this.form.controls['email'].value,
          Clave: null,
          CreatedOn: this.user.createdOn,
          Tienda: {
            Id: this.user.idTienda,
            Nombre: this.form.controls['storeName'].value,
            Direccion: this.form.controls['address'].value,
            Telefono: this.form.controls['telephone'].value
          }
        }
        this.userService.update(user).subscribe(
          res=>{
            this.myModal.nativeElement.click()
        }, err=>{
          console.log(err)
        })
      } else {
        const user = {
          Id: this.user.id,
          IdRol: this.user.idRol,
          IdTienda: this.user.idTienda,
          Nombre: this.form.controls['name'].value,
          Apellido: this.form.controls['lastName'].value,
          Correo: this.form.controls['email'].value,
          Clave: null,
          CreatedOn: this.user.createdOn,
          Tienda: {
            Id: this.user.idTienda,
            Nombre: this.user.tienda.nombre,
            Direccion: this.user.tienda.direccion,
            Telefono: this.user.tienda.telefono
          }
        }
        this.userService.update(user).subscribe(
          res=>{
            this.myModal.nativeElement.click()
        }, err=>{
          console.log(err)
        })
      }      
    }
    
  }

}
