import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL_USERLIST = environment.url_userList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(private http: HttpClient) {}

  get = (page) => {    
    return this.http.get(`${this.URL_USERLIST}/p/${page}`, {headers: this.headers})
  }

  createUser(user) {
    return this.http.post(this.URL_USERLIST, user, {headers: this.headers})
  }

  create(user) {
    return this.http.post(`${this.URL_USERLIST}/empleado`, user, {headers: this.headers})
  }

  delete = (id) => {
    return this.http.delete(`${this.URL_USERLIST}/${id}`, {headers: this.headers})
  }

  update(user) {
    return this.http.put(`${this.URL_USERLIST}/${user.id}`, user, {headers: this.headers})
  }
}
