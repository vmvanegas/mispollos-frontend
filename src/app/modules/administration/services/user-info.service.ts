import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  user = {}

  constructor() { }

  get User() {
    return this.user
  }

  set User(user) {
    this.user = user
  }

}
