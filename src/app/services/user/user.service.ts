import {UserSinLogear} from "./user.type";
import {Injectable, OnInit} from "@angular/core";
import {UserLogeado} from "./user.type";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserService{
  usuariosLogeadoUrl: string = '../assets/data/user.json';

  constructor(private httpClient:HttpClient) {

  }

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
}
