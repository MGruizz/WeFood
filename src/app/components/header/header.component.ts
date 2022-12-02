import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {UserService} from "../../services/user/user.service";
import {UserLogeado} from "../../services/user/user.type";
import {UserMapper} from "../../services/user/user.mapper";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  constructor(
    private authService: AuthService,
    private userMapper: UserMapper

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
  esAdmin(): boolean{
    console.log(JSON.parse(this.authService.getUser()!));
    let usuario: UserLogeado=  JSON.parse(this.authService.getUser()!);
    console.log(usuario)
    if(usuario.isAdmin){
      return true;
    }
    return false;
  }


}
