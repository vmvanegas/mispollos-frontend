import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  URL_USERLIST = environment.url_userList

  constructor(
    private http: HttpClient
  ) { }


  createUser(body){
    return this.http.post<any>(this.URL_USERLIST, body)
  }

}
