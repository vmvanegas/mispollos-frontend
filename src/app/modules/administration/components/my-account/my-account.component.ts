import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

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
