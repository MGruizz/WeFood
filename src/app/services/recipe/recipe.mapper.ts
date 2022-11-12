import {Injectable} from "@angular/core";
import {Recipe, RecipeDTO} from "./recipe.type";

@Injectable({
  providedIn: 'root'
})

export class RecipeMapper {
  constructor() {  }

  mapRecipeToRecipeDto(receta: Recipe):RecipeDTO{
    const recetaDto = {} as RecipeDTO;
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
