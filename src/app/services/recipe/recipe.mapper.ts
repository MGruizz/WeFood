import {Injectable} from "@angular/core";
import {Recipe, RecipeDto} from "./recipe.type";

@Injectable({
  providedIn: 'root'
})

export class RecipeMapper {
  constructor() {  }

  mapRecipeToRecipeDto(receta: Recipe):RecipeDto{
    const recetaDto = {} as RecipeDto;
    recetaDto.idautor = receta.idAutor;
    recetaDto.idreceta = receta.idReceta;
    recetaDto.nombrereceta = receta.nombreReceta;
    recetaDto.descripcionreceta = receta.descripcionReceta;
    recetaDto.ingredientes = receta.ingredientes;
    recetaDto.pasosreceta = receta.pasosReceta;
    recetaDto.imagenes = receta.imagenes;
    recetaDto.autor = receta.autor;
    recetaDto.tags = receta.tags;
    return recetaDto;
  }

}
