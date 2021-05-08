import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  URL_PROVIDERLIST = environment.url_providerList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(private http: HttpClient) {}


  getProviders(page) {
    return this.http.get(`${this.URL_PROVIDERLIST}/p/${page}`, {headers: this.headers})
  }

  createProvider(provider) {
    return this.http.post(this.URL_PROVIDERLIST, provider, {headers: this.headers})
  }

  deleteProvider(id) {
    return this.http.delete(`${this.URL_PROVIDERLIST}/${id}`, {headers: this.headers})
  }

  updateProvider(provider) {
    return this.http.put(`${this.URL_PROVIDERLIST}/${provider.id}`, provider, {headers: this.headers})
  }

}
