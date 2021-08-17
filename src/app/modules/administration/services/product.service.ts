import { formatCurrency } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DatePipeService } from './date-pipe.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  URL_PRODUCTLIST = environment.url_productList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(
    private http: HttpClient,
    private datePipe: DatePipeService
    ) {}

  getList = () => {
    return this.http.get(`${this.URL_PRODUCTLIST}`, {headers: this.headers})
  }

  getById(id) {
    return this.http.get(`${this.URL_PRODUCTLIST}/${id}`, {headers: this.headers}).pipe(
      map((item: any) => {
          item.fechaVencimiento = this.datePipe.transform(item.fechaVencimiento, "yyyy-MM-dd")
        return item;
      })
    )
  }

  get(page, search = null) {   

    if(search==null){
      return this.http.get(`${this.URL_PRODUCTLIST}/p/${page}`, {headers: this.headers})
      .pipe(
        map((data: any) => {
          data.data.forEach(item => {
            item.fechaVencimiento = this.datePipe.transform(item.fechaVencimiento, "yyyy-MM-dd")
            item.precio = formatCurrency(item.precio, "es-CO", "$", "", "1.0-1")
          });
          return data;
        })
      )
    } else {
      return this.http.get(`${this.URL_PRODUCTLIST}/p/${page}?search=${search}`, {headers: this.headers}).pipe(
        map((data: any) => {
          data.data.forEach(item => {
            item.fechaVencimiento = this.datePipe.transform(item.fechaVencimiento, "yyyy-MM-dd")
            item.precio = formatCurrency(item.precio, "es-CO", "$", "", "1.0-1")
          });
          return data;
        })
      )
    }  
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
