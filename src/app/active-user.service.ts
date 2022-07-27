import { Injectable } from '@angular/core';
import { User } from './_models/user.model';
import { CookieService } from 'ngx-cookie-service'
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class ActiveUserService {
  constructor(private localStorage: LocalStorageService, private cookie: CookieService) { }

  assignActive(user: string) {
    this.cookie.set('user', user);
  }

  getActive() {
    return this.cookie.get('user');
  }
 
  getActiveStorage() {
    const loginData = this.localStorage.loadUser(this.getActive()) ?? "null";

    var data: any = "";

    if (loginData == "") {
      data = "null";
    } else {
      data = JSON.parse(loginData);
    }

    return data;
  }

  updateActive(user: User): void {
    this.localStorage.addUser(user)
  }

}
