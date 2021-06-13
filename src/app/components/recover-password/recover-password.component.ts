import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/modules/administration/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from 'src/app/utils/MustMatch';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {


  @ViewChild('myModal') myModal: ElementRef

  public form: FormGroup
  public token
  public user
  public tokenExpired: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.token = this.activatedRoute.snapshot.paramMap.get('token');

    this.form = formBuilder.group({
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$")]],
      passwordConfirmation: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$")]]
    },
      {
        validators: Validators.compose([MustMatch('password', 'passwordConfirmation')])
      })

    this.getUser()
  }

  get f() {
    return this.form.controls
  }

  ngOnInit(): void {
  }


  getUser() {
    this.authService.getUserByToken(this.token).subscribe(
      (res: any) => {
        if (res) {
          this.user = res
          let tokenExpiration = new Date(this.user.tokenExpiration)
          let nowDate = new Date()
          if (nowDate > tokenExpiration) {
            this.tokenExpired = true
          }
        }
      },
      err => {
        console.log(err)
      })
  }

  send() {
    if (this.form.valid) {
      const employee = {
        Id: this.user.id,
        IdRol: this.user.idRol,
        IdTienda: this.user.idTienda,
        Nombre: this.user.nombre,
        Apellido: this.user.apellido,
        Correo: this.user.correo,
        Clave: this.form.controls['password'].value,
        Token: null,
        tokenExpiration: null
      }

      this.userService.update(employee).subscribe(
        res => {
          this.form.reset()
          this.myModal.nativeElement.click()
        },
        err => {
          console.log(err)
        }
      )
    }
  }

}
