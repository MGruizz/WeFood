import {User} from "./user.type";
import {Injectable, OnInit} from "@angular/core";
import {UserLogeado} from "./user.type";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserService{
  usuariosLogeados: UserLogeado[] = [];
  usuariosLogeadoUrl: string = '../assets/data/user.json';


  constructor(private httpClient:HttpClient) {

  }

  cargarUsers(): void {
    this.httpClient.get(this.usuariosLogeadoUrl).subscribe((value)=>{
      this.usuariosLogeados = (value as UserLogeado[]);
    })
  }

  buscarUsuario(idUsuario: number):UserLogeado{
    if(this.usuariosLogeados.length == 0){
      this.cargarUsers();
    }

    for (let user of this.usuariosLogeados) {
      if (user.idUsuario == idUsuario){
        return user;
      }
    }
    return {} as UserLogeado;
  }
}
