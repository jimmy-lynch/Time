import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './_models/user.model';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

constructor() {
  }
   //getters + setters
  addUser(data: User) {
    const jsonData = JSON.stringify(data)
    localStorage.setItem(data.username, jsonData)
   }

  loadUser(username: string) {
    const rawData = localStorage.getItem(username) ?? '';

    if (rawData == null) {
      return null;
    } else {
      return rawData;
    }
   }

   clearUser(user: string) {
      localStorage.removeItem(user);
   }

   clearAllUsers() {
    localStorage.clear();
   }
}
