import {RegistroUsuario, UserSinLogear} from "./user.type";
import {Injectable, OnInit} from "@angular/core";
import {UserLogeado} from "./user.type";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserMapper} from "./user.mapper";

@Injectable({
  providedIn: 'root'
})

export class UserService{
  usuariosLogeadoUrl: string = '../assets/data/user.json';
  private USUARIOS_ENDPOINT = '/usuario';
  private USUARIOS_LOGIN_ENDPOINT = '/login';


  constructor(
    private httpClient:HttpClient,
    private userMapper:UserMapper,
  ) {}

  cargarUsers(): Observable<any> {
    return this.httpClient.get(this.usuariosLogeadoUrl);
  }

  buscarUsuario(idUsuario: number, usuariosLogeados: UserLogeado[]):UserLogeado{
    for (let user of usuariosLogeados) {
      if (user.idUsuario == idUsuario){
        return user;
      }
    }
    return {} as UserLogeado;
  }

  registrarUsuario (usuario:RegistroUsuario):Observable<any>{
    const body = this.userMapper.mapRegistroUsuarioToRegistroUsuarioDTO(usuario);
    return this.httpClient.post(this.usuariosLogeadoUrl + this.USUARIOS_ENDPOINT,body);
  }

  iniciarSesion(mail: string , password: string):Observable<any>{
    const body = this.userMapper.mapLoginDataToLogInBody(mail,password);
    const url = this.usuariosLogeadoUrl + this.USUARIOS_LOGIN_ENDPOINT;
    return this.httpClient.post(url,body);
  }
}
