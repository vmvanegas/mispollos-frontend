import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  URL_PRODUCTLIST = environment.url_productList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(private http: HttpClient) {}

  getList = () => {
    return this.http.get(`${this.URL_PRODUCTLIST}`, {headers: this.headers})
  }

  getById(id) {
    return this.http.get(`${this.URL_PRODUCTLIST}/${id}`, {headers: this.headers})
  }

  get(page) {
    return this.http.get(`${this.URL_PRODUCTLIST}/p/${page}`, {headers: this.headers})
  }
  create(product) {
    return this.http.post(this.URL_PRODUCTLIST, product, {headers: this.headers})
  }

  delete(id) {
    return this.http.delete(`${this.URL_PRODUCTLIST}/${id}`, {headers: this.headers})
  }

  update(product) {
    return this.http.put(`${this.URL_PRODUCTLIST}/${product.id}`, product, {headers: this.headers})
  }
}
