import {Injectable} from "@angular/core";
import {UserLogeado, UserSinLogear, UserLogeadoDTO, RegistroUsuario, RegistroUsuarioDTO} from "./user.type";
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
    usuario.password = password;
    return usuario;
  }

  mapUserLogeadoToUsuarioDTO(usuario: UserLogeado):UserLogeadoDTO{
    const usuarioDTO = {} as UserLogeadoDTO;
    usuarioDTO.idusuario = usuario.idUsuario;
    usuarioDTO.correoelectronico = usuario.correoElectronico;
    usuarioDTO.password = usuario.password;
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

  mapUserLogeadoDTOToUsuario(usuarioDTO: UserLogeadoDTO):UserLogeado{
    const usuario = {} as UserLogeado;
    usuario.idUsuario = usuarioDTO.idusuario;
    usuario.correoElectronico = usuarioDTO.correoelectronico;
    usuario.password = usuarioDTO.password;
    usuario.nombrePersona = usuarioDTO.nombrepersona;
    usuario.isAdmin = usuarioDTO.isadmin;
    if(usuarioDTO.descripcionusuario){
      usuario.descripcionUsuario = usuarioDTO.descripcionusuario;
    }
    if(usuarioDTO.redessociales){
      usuario.redesSociales = usuarioDTO.redessociales;
    }
    if(usuarioDTO.fotoperfil) {
      usuario.fotoPerfil = usuarioDTO.fotoperfil;
    }
    return usuario;
  }


}
