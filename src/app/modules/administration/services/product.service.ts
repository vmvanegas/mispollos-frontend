import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  URL_PROVIDERLIST = environment.url_productList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(private http: HttpClient) {}


  getCategories(page) {
    return this.http.get(`${this.URL_PROVIDERLIST}/p/${page}`, {headers: this.headers})
  }

  createProduct(product) {
    return this.http.post(this.URL_PROVIDERLIST, product, {headers: this.headers})
  }

  deleteProduct(id) {
    return this.http.delete(`${this.URL_PROVIDERLIST}/${id}`, {headers: this.headers})
  }

  updateProduct(product) {
    return this.http.put(`${this.URL_PROVIDERLIST}/${product.id}`, product, {headers: this.headers})
  }
}
