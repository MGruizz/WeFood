import {Tag} from "../tag/tag.type";
import {Comentario} from "../comentarios/comentarios.type";

export interface Recipe{
  idAutor: number;
  idReceta: number;
  nombreReceta : string;
  descripcionReceta: string;
  ingredientes: string;
  pasosReceta: string;
  imagenes : string;
  autor: string;
  tags?: Tag[];
  comentarios?:Comentario[];
}

export interface RecipeDTO{
  idautor: number;
  idreceta: number;
  nombrereceta: string;
  descripcionreceta: string;
  ingredientes: string;
  pasosreceta: string;
  imagenes: string;
  nombrepersona: string;
  tags?: Tag[];
  comentarios?:Comentario[];
}

export interface NewRecipe{
  nombrereceta:string,
  descripcionreceta:string,
  ingredientes:string,
  pasosrecetas:string,
  imagenes:string,
  tags:number[]
}

export interface RecetaEdit{
  idReceta: number;
  nombreReceta: string;
  descripcionReceta: string;
  ingredientes: string;
  pasosReceta: string;
  tags: Tag[];
}
