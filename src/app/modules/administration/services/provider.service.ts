import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  URL_PROVIDERLIST = environment.url_providerList

  constructor(private http: HttpClient) { }


  getProviders(page) {
    return this.http.get(`${this.URL_PROVIDERLIST}/p/${page}`)
  }

  createProvider(provider) {
    return this.http.post(this.URL_PROVIDERLIST, provider)
  }

  deleteProvider(id) {
    return this.http.delete(`${this.URL_PROVIDERLIST}/${id}`)
  }

  updateProvider(provider) {
    return this.http.put(`${this.URL_PROVIDERLIST}/${provider.id}`, provider)
  }

}
