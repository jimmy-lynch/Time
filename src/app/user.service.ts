import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { User } from './_models/user.model';

@Injectable()

export class UserService {
  constructor(private storage: LocalStorageService) { }

  newUser(name: string, email: string, password: string) {
    const testee = new User(name, email, password);
    this.storage.addUser(testee);
  }

  login(name: string, password: string) {
    const loginData = this.storage.loadUser(name) ?? "null";

    const success: string = "success";
    const userNotFound: string = "userNotFound";
    const incorrectPass: string = "incorrectPass";

    var data: any = "";

    if (loginData == "") {
      data = "null";
    } else {
      data = JSON.parse(loginData);
    }

    if (data == "null") {
      return userNotFound;
    } else if (data.password != password) {
      return incorrectPass;
    } else {
      return success
    }
  }

  validatedUser(name: string, password: string) {
    const loginData = this.storage.loadUser(name) ?? "null";
    const data = JSON.parse(loginData);

    return data;
  }

}


