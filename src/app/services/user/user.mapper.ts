import {Injectable} from "@angular/core";
import {UserSinLogear} from "./user.type";

@Injectable({
  providedIn: 'root'
})

export class UserProviderMapper {
  constructor() {  }

  mapLoginDataToLogInBody(mail: string , password: string): UserSinLogear {
    const usuario = {} as UserSinLogear
    usuario.nombreUsuario = mail;
    usuario.contrasena = password;
    return usuario;
  }



}
