import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  URL_PROVIDERLIST = environment.url_orderList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(private http: HttpClient) {}


  getOrders(page) {
    return this.http.get(`${this.URL_PROVIDERLIST}/p/${page}`, {headers: this.headers})
  }

  createOrder(order) {
    return this.http.post(this.URL_PROVIDERLIST, order, {headers: this.headers})
  }

  deleteOrder(id) {
    return this.http.delete(`${this.URL_PROVIDERLIST}/${id}`, {headers: this.headers})
  }

  updateOrder(order) {
    return this.http.put(`${this.URL_PROVIDERLIST}/${order.id}`, order, {headers: this.headers})
  }
}
