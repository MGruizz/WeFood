import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  constructor(
    private authService: AuthService

  ) { }

  ngOnInit(): void {
  }
  logOut(){
    this.authService.logOut();
  }
  estaLogeado(): boolean{
    if (this.authService.loggedIn()){
      return true
    }
    return false
  }


}
