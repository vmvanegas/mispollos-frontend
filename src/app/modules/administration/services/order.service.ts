import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { DatePipeService } from './date-pipe.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  URL_PROVIDERLIST = environment.url_orderList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(
    private http: HttpClient,
    private datePipe: DatePipeService
    ) {}


  get(page) {
    return this.http.get(`${this.URL_PROVIDERLIST}/p/${page}`, {headers: this.headers}).
    pipe( 
       map((data: any) => {
         data.data.forEach(item => {
           item.fecha = this.datePipe.transform(item.fecha, "yyyy-MM-dd")
         });
         return data;
       })
    )
  }

  getById(id) {
    return this.http.get(`${this.URL_PROVIDERLIST}/${id}`, {headers: this.headers})
  }

  create(order) {
    return this.http.post(this.URL_PROVIDERLIST, order, {headers: this.headers})
  }

  delete(id) {
    return this.http.delete(`${this.URL_PROVIDERLIST}/${id}`, {headers: this.headers})
  }

  update(order) {
    return this.http.put(`${this.URL_PROVIDERLIST}/${order.id}`, order, {headers: this.headers})
  }
}
