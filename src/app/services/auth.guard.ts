import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService
    ){}
    

  canActivate(): boolean{
    if(this.authService.isLoggedIn() && !this.jwtHelper.isTokenExpired(this.authService.getToken())){
      return true
    }

    this.router.navigate(['/login'])
    return false
  }
  
}
