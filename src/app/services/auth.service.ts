import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL_USERLIST = environment.url_userList
  URL_VALIDATEUSER = environment.url_validateUser

  constructor(
    private http: HttpClient
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

}
