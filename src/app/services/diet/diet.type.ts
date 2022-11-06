import {Recipe} from "../recipe/recipe.type";

export interface Diet{
  idAutor: number;
  idDieta: number;
  nombreDieta: string;
  descripcionDieta: string;
  recetas?: Recipe[];
}
