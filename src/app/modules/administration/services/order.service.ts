import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { DatePipeService } from './date-pipe.service';
import { formatCurrency } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  URL_ORDERLIST = environment.url_orderList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(
    private http: HttpClient,
    private datePipe: DatePipeService
  ) { }

  getList = () => {
    return this.http.get(`${this.URL_ORDERLIST}`, { headers: this.headers })
  }

  get(page, search = null) {
    if(search==null){
      return this.http.get(`${this.URL_ORDERLIST}/p/${page}`, { headers: this.headers }).
      pipe(
        map((data: any) => {
          data.data.forEach(item => {
            item.valorTotal = formatCurrency(item.valorTotal, "es-CO", "$", "", "1.0-1")
            item.fecha = this.datePipe.transform(item.fecha, "yyyy-MM-dd")
          });
          return data;
        })
      )
    } else {
      return this.http.get(`${this.URL_ORDERLIST}/p/${page}?search=${search}`, {headers: this.headers}).
      pipe(
        map((data: any) => {
          data.data.forEach(item => {
            item.valorTotal = formatCurrency(item.valorTotal, "es-CO", "$", "", "1.0-1")
            item.fecha = this.datePipe.transform(item.fecha, "yyyy-MM-dd")
          });
          return data;
        })
      )
    }    
  }

  getById(id) {
    return this.http.get(`${this.URL_ORDERLIST}/${id}`, { headers: this.headers })
  }

  create(order) {
    return this.http.post(this.URL_ORDERLIST, order, { headers: this.headers })
  }

  delete(id) {
    return this.http.delete(`${this.URL_ORDERLIST}/${id}`, { headers: this.headers })
  }

  update(order) {
    return this.http.put(`${this.URL_ORDERLIST}/${order.id}`, order, { headers: this.headers })
  }
}
