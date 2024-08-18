import { Injectable } from '@angular/core';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: User;
  isLoggedIn: boolean = false;

  constructor() {}

  isAuthenticated(): boolean {
    const userString = localStorage.getItem('user');

    if (userString !== null) {
      this.user = JSON.parse(userString);
      this.isLoggedIn = true;
    } else {
      this.user = null as any;
      this.isLoggedIn = false;
    }

    return this.isLoggedIn;
  }
}