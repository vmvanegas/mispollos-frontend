import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  URL_CUSTOMERLIST = environment.url_customerList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(private http: HttpClient) {}


  getList = () => {
    return this.http.get(`${this.URL_CUSTOMERLIST}`, {headers: this.headers})
  }
  
  get(page, search = null) {
    if(search==null){
      return this.http.get(`${this.URL_CUSTOMERLIST}/p/${page}`, {headers: this.headers})
    } else {
      return this.http.get(`${this.URL_CUSTOMERLIST}/p/${page}?search=${search}`, {headers: this.headers})
    }    
  }

  create(customer) {
    return this.http.post(this.URL_CUSTOMERLIST, customer, {headers: this.headers})
  }

  delete = (id) =>{
    return this.http.delete(`${this.URL_CUSTOMERLIST}/${id}`, {headers: this.headers})
  }

  update(customer) {
    return this.http.put(`${this.URL_CUSTOMERLIST}/${customer.id}`, customer, {headers: this.headers})
  }

}
