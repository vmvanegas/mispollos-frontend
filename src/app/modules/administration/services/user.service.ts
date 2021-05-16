import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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



  getUsers(page) {
    return this.http.get(`${this.URL_USERLIST}/p/${page}`, {headers: this.headers})
  }
  createUser(user) {
    return this.http.post(this.URL_USERLIST, user, {headers: this.headers})
  }

  deleteUser(id) {
    return this.http.delete(`${this.URL_USERLIST}/${id}`, {headers: this.headers})
  }

  updateUser(user) {
    return this.http.put(`${this.URL_USERLIST}/${user.id}`, user, {headers: this.headers})
  }
}
