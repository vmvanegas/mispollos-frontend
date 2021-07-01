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

  getList() {
    return this.http.get(this.URL_CATEGORYLIST, {headers: this.headers})
  }

  get(page, search = null) {
    if(search==null){
      return this.http.get(`${this.URL_CATEGORYLIST}/p/${page}`, {headers: this.headers})
    } else {
      return this.http.get(`${this.URL_CATEGORYLIST}/p/${page}?search=${search}`, {headers: this.headers})
    }
  }//LEER CATEGORIA

  create(category) {
    return this.http.post(this.URL_CATEGORYLIST, category, {headers: this.headers})
  }//CREAR CATEGORIA

  delete(id) {
    return this.http.delete(`${this.URL_CATEGORYLIST}/${id}`, {headers: this.headers})
  }//BORRAR CATEGORIA

  update(category) {
    return this.http.put(`${this.URL_CATEGORYLIST}/${category.id}`, category, {headers: this.headers})
  }//ACTUALIZAR CATEGORIA

}
