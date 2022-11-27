import {RegistroUsuario, UserSinLogear} from "./user.type";
import {Injectable, OnInit} from "@angular/core";
import {UserLogeado} from "./user.type";
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import {UserMapper} from "./user.mapper";
import {constants} from "../../../environments/constants";

@Injectable({
  providedIn: 'root'
})

export class UserService{

  set user(value: UserLogeado) {
    this._user = value;
  }

  private USUARIOS_ENDPOINT = '/usuarios';
  private USUARIOS_LOGIN_ENDPOINT = '/login/';
  private _user: UserLogeado | undefined;

  constructor(
    private httpClient:HttpClient,
    private userMapper:UserMapper,
  ) {}


  registrarUsuario (usuario:RegistroUsuario):Observable<any>{
    const body = this.userMapper.mapRegistroUsuarioToRegistroUsuarioDTO(usuario);
    const url = constants.API_URL + this.USUARIOS_ENDPOINT;
    return this.httpClient.post(url,body,{observe: 'response'});
  }

  iniciarSesion(mail: string , password: string):Observable<any>{
    const body = this.userMapper.mapLoginDataToLogInBody(mail,password);
    const url = constants.API_URL + this.USUARIOS_LOGIN_ENDPOINT;
    return this.httpClient.post(url,body,{observe: 'response'});
  }

  getUserById():Observable<any>{
    return of(this.getUser()).pipe(
      map((user)=>{
        if(user){
          return user;
        }
        return localStorage.getItem('user');
      })
    );
  }

  getUser():UserLogeado | undefined{
    return this._user;
  }
}
