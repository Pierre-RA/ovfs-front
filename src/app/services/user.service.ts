import { Injectable } from '@angular/core';
import { SignIn } from '../models';

import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isAuthenticated: BehaviorSubject<boolean>;

  constructor() {
    const auth = !!localStorage.getItem('auth');
    this.isAuthenticated = new BehaviorSubject(auth);
  }

  async signIn(credentials: SignIn): Promise<boolean> {
    localStorage.setItem('auth', credentials.email);
    this.isAuthenticated.next(true);
    return true;
  }

  signOut() {
    localStorage.removeItem('auth');
    this.isAuthenticated.next(false);
  }

  signUp() {
    console.log('sign up...');
  }

  getAuthentication(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}

