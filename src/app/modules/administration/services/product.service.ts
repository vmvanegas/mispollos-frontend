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

  getProduct(id) {
    return this.http.get(`${this.URL_PRODUCTLIST}/${id}`, {headers: this.headers})
  }

  getProducts(page) {
    return this.http.get(`${this.URL_PRODUCTLIST}/p/${page}`, {headers: this.headers})
  }
  createProduct(product) {
    return this.http.post(this.URL_PRODUCTLIST, product, {headers: this.headers})
  }

  deleteProduct(id) {
    return this.http.delete(`${this.URL_PRODUCTLIST}/${id}`, {headers: this.headers})
  }

  updateProduct(product) {
    return this.http.put(`${this.URL_PRODUCTLIST}/${product.id}`, product, {headers: this.headers})
  }
}
