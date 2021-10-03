import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/modules/administration/services/user-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from 'src/app/utils/MustMatch';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

  @ViewChild('modalToggleSignUp') 
  modalToggleSignUp: ElementRef

  @ViewChild('myModalSignUp') 
  myModalSignUp: ElementRef

  @ViewChild('modalToggle') 
  modalToggle: ElementRef

  @ViewChild('myModal') 
  myModal: ElementRef

  @ViewChild('container') 
  container: ElementRef

  public loginForm: FormGroup
  public profileForm: FormGroup
  public wrongUser: boolean = false
  public error: boolean = false
  

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private userInfo: UserInfoService,
    ) { 
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(60), Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$")]]
    })

    this.profileForm = formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(2), Validators.pattern("[a-zA-Z ]{0,}")]],
      lastName: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(2), Validators.pattern("[a-zA-Z ]{0,}")]],
      email: ['', [Validators.required, Validators.maxLength(60), Validators.email]],
      emailConfirmation: ['', [Validators.required, Validators.maxLength(60), Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8) ,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$")]],
      passwordConfirmation: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8) ,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$")]],
      storeName: ['', [Validators.required, Validators.maxLength(60)]],
      address: ['', [Validators.required, Validators.maxLength(60)]],
      telephone: ['', [Validators.required, Validators.maxLength(20)]],
    }, 
      {
        validators: Validators.compose([MustMatch('email', 'emailConfirmation'), MustMatch('password', 'passwordConfirmation')])
      }
    )
  }


  currentYear(){
    return new Date().getFullYear()
  }

  ngOnInit(): void {
  }
  get form() {
    return this.loginForm.controls
  }

  get signupForm() {
    return this.profileForm.controls
  }

  login() {     
    if(this.loginForm.valid) {

      const body = {
        Email: this.loginForm.controls['email'].value,
        Password: this.loginForm.controls['password'].value
      }

      this.authService.validateUser(body).subscribe(response=>{
        this.wrongUser = false
        localStorage.setItem("token", JSON.stringify(response.token))     
        localStorage.setItem("user", JSON.stringify(response))  
        this.userInfo.User = response
        this.loginForm.reset()     
        this.redirectToAdmin()
      }, err=>{
        this.wrongUser = true
        this.showModal()
        console.log(err)
      })
    }

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

      this.authService.createUser(body).subscribe(
        response=>{
        this.profileForm.reset()
        this.error = false
        this.showModalSignUp()
      }, err=>{
        this.error = true
        this.showModalSignUp()
        console.log(err)
      })
    }

  }


  showModal() {
    this.modalToggle.nativeElement.click()
  }

  showModalSignUp() {
    this.modalToggleSignUp.nativeElement.click()
  }


  redirectToAdmin() {
    this.router.navigate(['/administracion/dashboard'])
  }

  redirectToLogin() {
    this.router.navigate(['/login'])
  }


  toSignUp(){
    this.container.nativeElement.classList.toggle("active-signup")
  }
}
