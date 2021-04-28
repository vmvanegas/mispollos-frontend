import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router: Router
    ) { 
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }


  login() {   

    this.loginForm.markAllAsTouched()
    console.log(this.loginForm)
    if(this.loginForm.valid) {
      console.log("funciona el metodo hasta aqui")

      const body = {
        Email: this.loginForm.controls['email'].value,
        Password: this.loginForm.controls['password'].value
      }

      this.authService.validateUser(body).subscribe(response=>{
        console.log(response)
        localStorage.setItem("token", JSON.stringify(response.token))        
        this.loginForm.reset()
        this.router.navigate(['/administracion/productos'])
      }, err=>{
        alert("Usuario Incorrecto")
        console.log(err)
      })
    }

  }

}
