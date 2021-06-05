import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/modules/administration/services/user-info.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

  @ViewChild('modalToggle') modalToggle: ElementRef
  @ViewChild('myModal') myModal: ElementRef
  public loginForm: FormGroup
  public wrongUser: boolean = false
  

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private userInfo: UserInfoService,
    ) { 
      if(localStorage.getItem("token")) {
        this.redirectToAdmin()
      }
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(60), Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$")]]
    })
  }

  ngOnInit(): void {
  }
  get form() {
    return this.loginForm.controls
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


  showModal() {
    this.modalToggle.nativeElement.click()
  }


  redirectToAdmin() {
    this.router.navigate(['/administracion/productos'])
  }

}
