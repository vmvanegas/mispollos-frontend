import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from '../../utils/MustMatch' 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('modalToggle') modalToggle: ElementRef
  @ViewChild('myModal') myModal: ElementRef
  profileForm: FormGroup
  public error: boolean = false
  

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router: Router
    ) { 
    this.profileForm = formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(2), Validators.pattern("[a-zA-Z ]{0,}")]],
      lastName: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(2), Validators.pattern("[a-zA-Z ]{0,}")]],
      email: ['', [Validators.required, Validators.maxLength(60), Validators.email]],
      emailConfirmation: ['', [Validators.required, Validators.maxLength(60), Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8) ,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$")]],
      passwordConfirmation: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8) ,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$")]],
      storeName: ['', [Validators.required, Validators.maxLength(60), Validators.pattern("[a-zA-Z ]{0,}")]],
      address: ['', [Validators.required, Validators.maxLength(60)]],
      telephone: ['', [Validators.required, Validators.maxLength(20)]],
    }, 
      {
        validators: Validators.compose([MustMatch('email', 'emailConfirmation'), MustMatch('password', 'passwordConfirmation')])
      }
    )
  }

  get form() {
    return this.profileForm.controls
  }

  ngOnInit(): void {
  }


  signUp() {   
    if(this.profileForm.valid) {
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

      this.authService.createUser(body).subscribe(response=>{
        this.profileForm.reset()
        this.showModal()
        this.error = false
      }, err=>{
        this.error = true
        this.showModal()
        console.log(err)
      })
    }

  }


  showModal() {
    this.modalToggle.nativeElement.click()
  }


  redirectToLogin() {
    this.router.navigate(['/login'])
  }
  
}
