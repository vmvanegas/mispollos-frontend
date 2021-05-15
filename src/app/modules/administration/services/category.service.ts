import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  URL_PROVIDERLIST = environment.url_categoryList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(private http: HttpClient) {}


  getCategories(page) {
    return this.http.get(`${this.URL_PROVIDERLIST}/p/${page}`, {headers: this.headers})
  }//LEER CATEGORIA

  createCategory(category) {
    return this.http.post(this.URL_PROVIDERLIST, category, {headers: this.headers})
  }//CREAR CATEGORIA

  deleteCategory(id) {
    return this.http.delete(`${this.URL_PROVIDERLIST}/${id}`, {headers: this.headers})
  }//BORRAR CATEGORIA

  updateCategory(category) {
    return this.http.put(`${this.URL_PROVIDERLIST}/${category.id}`, category, {headers: this.headers})
  }//ACTUALIZAR CATEGORIA

}
