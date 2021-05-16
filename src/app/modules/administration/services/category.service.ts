import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  URL_CATEGORYLIST = environment.url_categoryList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(private http: HttpClient) {}

  getCategoriesList() {
    return this.http.get(this.URL_CATEGORYLIST, {headers: this.headers})
  }

  getCategories(page) {
    return this.http.get(`${this.URL_CATEGORYLIST}/p/${page}`, {headers: this.headers})
  }//LEER CATEGORIA

  createCategory(category) {
    return this.http.post(this.URL_CATEGORYLIST, category, {headers: this.headers})
  }//CREAR CATEGORIA

  deleteCategory(id) {
    return this.http.delete(`${this.URL_CATEGORYLIST}/${id}`, {headers: this.headers})
  }//BORRAR CATEGORIA

  updateCategory(category) {
    return this.http.put(`${this.URL_CATEGORYLIST}/${category.id}`, category, {headers: this.headers})
  }//ACTUALIZAR CATEGORIA

}
