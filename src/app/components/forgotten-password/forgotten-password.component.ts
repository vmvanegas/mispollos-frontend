import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/modules/administration/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {

  @ViewChild('modalToggle') modalToggle: ElementRef

  public form: FormGroup
  public email
  public wrongUser: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(60), Validators.email]],
    })

  }

  get f() {
    return this.form.controls
  }

  ngOnInit(): void {
  }


  send() {
    if (this.form.valid) {
      this.email = this.f.email.value
      let body = {
        email: this.email
      }
      this.authService.recoverPassword(body).subscribe(
        (res: any) => {
          this.wrongUser = false
          this.modalToggle.nativeElement.click()
          this.form.reset()
        },
        err => { 
          this.wrongUser = true
          console.log(err) 
          this.modalToggle.nativeElement.click()
        }
      )
    }
  }

}
