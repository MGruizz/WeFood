import {Injectable} from "@angular/core";
import {UserLogeado, UserSinLogear, UserLogeadoDto, RegistroUsuario, RegistroUsuarioDTO} from "./user.type";
import {RedSocial} from "../../../environments/global.types";


@Injectable({
  providedIn: 'root'
})

export class UserMapper {
  constructor() {  }


  mapRegistroUsuarioToRegistroUsuarioDTO(usuario:RegistroUsuario):RegistroUsuarioDTO{
    const usuarioDTO = {} as RegistroUsuarioDTO;
    usuarioDTO.nombrepersona = usuario.nombrePersona;
    usuarioDTO.correoelectronico = usuario.correoElectronico;
    usuarioDTO.password = usuario.password;
    return usuarioDTO;

  }

  mapLoginDataToLogInBody(mail: string , password: string): UserSinLogear {
    const usuario = {} as UserSinLogear
    usuario.correoElectronico = mail;
    usuario.contrasena = password;
    return usuario;
  }

  mapUserLogeadoToUsuarioDTO(usuario: UserLogeado):UserLogeadoDto{
    const usuarioDTO = {} as UserLogeadoDto;
    usuarioDTO.idusuario = usuario.idUsuario;
    usuarioDTO.correoelectronico = usuario.correoElectronico;
    usuarioDTO.contrasena = usuario.contrasena;
    usuarioDTO.nombrepersona = usuario.correoElectronico;
    usuarioDTO.isadmin = usuario.isAdmin;
    if(usuario.descripcionUsuario){
      usuarioDTO.descripcionusuario = usuario.descripcionUsuario;
    }
    if(usuario.redesSociales){
      usuarioDTO.redessociales = usuario.redesSociales;
    }
    if(usuario.fotoPerfil) {
      usuarioDTO.fotoperfil = usuario.fotoPerfil;
    }
    return usuarioDTO;
  }



}
