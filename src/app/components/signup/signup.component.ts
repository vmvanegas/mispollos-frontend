import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  profileForm: FormGroup
  

  constructor(
    private formBuilder: FormBuilder,
    private accountService : AccountService
    ) { 
    this.profileForm = formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      storeName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }


  signUp() {   

    this.profileForm.markAllAsTouched()
    console.log(this.profileForm)
    if(this.profileForm.valid) {
      console.log("funciona el metodo hasta aqui")

      const body = {
        Nombre: this.profileForm.controls['firstName'].value,
        Apellido: this.profileForm.controls['lastName'].value,
        Correo: this.profileForm.controls['email'].value,
        Clave: this.profileForm.controls['password'].value,
        Tienda: {
            Nombre: this.profileForm.controls['storeName'].value,
            Direccion: this.profileForm.controls['address'].value,
            Telefono: this.profileForm.controls['telephone'].value
        }
      }

      this.accountService.createUser(body).subscribe(response=>{
        console.log(response)
        this.profileForm.reset()
      }, err=>{
        console.log(err)
      })
    }

  }
  
}
