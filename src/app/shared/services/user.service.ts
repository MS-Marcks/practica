import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router) { }

  getUserCurrent(): User {
    if (!localStorage.getItem("user")) {
      this.router.navigate(["auth"])
    }
    return JSON.parse(localStorage.getItem("user") || "[]")
  }
}
