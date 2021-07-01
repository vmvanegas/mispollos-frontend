import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL_USERLIST = environment.url_userList
  URL_VALIDATEUSER = environment.url_validateUser

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  createUser(body){
    return this.http.post<any>(this.URL_USERLIST, body)
  }

  validateUser(body){
    return this.http.post<any>(this.URL_VALIDATEUSER, body)
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token")
  }

  getToken() {
    return localStorage.getItem("token")
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  getUserByToken(token) {
    return this.http.get<any>(`${this.URL_USERLIST}/recuperar-clave/${token}`)
  }

  recoverPassword(email) {
    return this.http.post<any>(`${this.URL_USERLIST}/recuperar-cuenta`, email)
  }

}
