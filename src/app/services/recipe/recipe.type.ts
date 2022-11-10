import {Tag} from "../tag/tag.type";

export interface Recipe{
  idAutor: number;
  idReceta: number;
  nombreReceta : string;
  descripcionReceta: string;
  ingredientes: string;
  pasosReceta: string;
  imagenes : string[];
  autor: string;
  tags: Tag[];
}

export interface RecipeDto{
  idautor: number;
  idreceta: number;
  nombrereceta: string;
  descripcionreceta: string;
  ingredientes: string;
  pasosreceta: string;
  imagenes: string[];
  autor: string;
  tags: Tag[];
}
