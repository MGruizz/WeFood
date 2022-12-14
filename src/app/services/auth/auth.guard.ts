import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authservice: AuthService,
    private router : Router
  ) {
  }

  canActivate(): boolean{
    if (this.authservice.loggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
