import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  URL_PROVIDERLIST = environment.url_customerList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(private http: HttpClient) {}


  getList = () => {
    return this.http.get(`${this.URL_PROVIDERLIST}`, {headers: this.headers})
  }

  get = (page) => {
    return this.http.get(`${this.URL_PROVIDERLIST}/p/${page}`, {headers: this.headers})
  }

  create(customer) {
    return this.http.post(this.URL_PROVIDERLIST, customer, {headers: this.headers})
  }

  delete = (id) =>{
    return this.http.delete(`${this.URL_PROVIDERLIST}/${id}`, {headers: this.headers})
  }

  update(customer) {
    return this.http.put(`${this.URL_PROVIDERLIST}/${customer.id}`, customer, {headers: this.headers})
  }

}
