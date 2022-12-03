import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {UserLogeado} from "../user/user.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router : Router
  ) { }

  loggedIn(){
    return !!localStorage.getItem("token");
  }
  getToken() {
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }
  getUser(){
    return localStorage.getItem('user');
  }

  isAdmin(): boolean{
    let usuario: UserLogeado = JSON.parse(this.getUser()!);
    if (usuario.isAdmin) {
      return true;
    }
    return false;
  }
}
