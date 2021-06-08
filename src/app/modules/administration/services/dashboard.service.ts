import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  URL_DASHBOARD = environment.url_dashboard
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(
    private http: HttpClient
  ) { }

  getLastWeek = () => {
    return this.http.get(`${this.URL_DASHBOARD}/last-week`, { headers: this.headers })
  }

  getBestSellingProduct = () => {
    return this.http.get(`${this.URL_DASHBOARD}/best-selling-product`, { headers: this.headers })
  }

  getLeastSoldProduct = () => {
    return this.http.get(`${this.URL_DASHBOARD}/least-sold-product`, { headers: this.headers })
  }

  getSalesIncreasePercentage = () => {
    return this.http.get(`${this.URL_DASHBOARD}/sales-increase-percentage`, { headers: this.headers })
  }

  getCloseDueDate = () => {
    return this.http.get(`${this.URL_DASHBOARD}/close-due-date`, { headers: this.headers })
  }

  getLowStock = () => {
    return this.http.get(`${this.URL_DASHBOARD}/low-stock`, { headers: this.headers })
  }

}
