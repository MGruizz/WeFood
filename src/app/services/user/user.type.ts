import {Recipe} from "../recipe/recipe.type";
import {RedSocial} from "../../../environments/global.types";

export interface User{
  nombreUsuario: string;
  contrasena: string;
}

export interface UserLogeado{
  idUsuario:number
  nombreUsuario: string;
  contrasena: string;
  nombrePersona:string;
  descripcionUsuario: string;
  redesSociales?: RedSocial[];
  fotoPerfil: string;
  isAdmin: Boolean;
}

