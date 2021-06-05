import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanEnterGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
    ){}

  canActivate(): boolean{
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/administracion'])
      return false
    }
    
    return true
  }
  
}