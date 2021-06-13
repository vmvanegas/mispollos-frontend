import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  @ViewChild('activeBar') activeBar : ElementRef

  public form: FormGroup
  public idUser
  public user

  constructor(
    private userService : UserService,
    private formBuilder : FormBuilder
  ) {
    this.idUser = JSON.parse(localStorage.getItem("user")).id
    this.getInfo()
    this.form = formBuilder.group({
      name: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      storeName: ["", [Validators.required]],
      telephone: ["", [Validators.required]],
      address: ["", [Validators.required]]
    })
    
   }

  ngOnInit(): void {
    
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
      (res: any)=>{
        this.user = res
        this.form.setValue({
          name: this.user.nombre,
          lastName: this.user.apellido,
          email: this.user.correo,
          storeName: this.user.tienda.nombre,
          telephone: this.user.tienda.telefono,
          address: this.user.tienda.direccion
        })
      }, 
      err=>{
        console.log(err)
      })
  }

}
