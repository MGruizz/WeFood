import {Recipe} from "../recipe/recipe.type";
import {RedSocial} from "../../../environments/global.types";

export interface UserSinLogear{
  correoElectronico: string;
  password: string;
}

export interface UserLogeado{
  idUsuario:number
  correoElectronico: string;
  password: string;
  nombrePersona:string;
  descripcionUsuario?: string;
  redesSociales?: RedSocial[];
  fotoPerfil?: string;
  isAdmin: Boolean;
}

export interface UserLogeadoDTO{
  idusuario:number
  correoelectronico: string;
  password: string;
  nombrepersona:string;
  descripcionusuario?: string;
  redessociales?: RedSocial[];
  fotoperfil?: string;
  isadmin: Boolean;
}

export interface RegistroUsuario{
  nombrePersona: string;
  correoElectronico: string;
  password: string;
}

export interface RegistroUsuarioDTO{
  nombrepersona: string;
  correoelectronico: string;
  password: string;
}

export interface UsuarioEdit{
  idUsuario: number;
  nombreUsuario: string;
  descripcion: string;
  fotoPerfil?: string;
}
