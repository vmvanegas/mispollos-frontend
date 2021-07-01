import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanEnterGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService
    ){}

  canActivate(): boolean{
    if(this.authService.isLoggedIn() && !this.jwtHelper.isTokenExpired(this.authService.getToken())){
      this.router.navigate(['/administracion'])
      return false
    }
    
    return true
  }
  
}
