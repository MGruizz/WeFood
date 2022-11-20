import {Injectable} from "@angular/core";
import {Recipe, RecipeDTO} from "./recipe.type";

@Injectable({
  providedIn: 'root'
})

export class RecipeMapper {
  constructor() {  }

  mapRecipeToRecipeDto(receta: Recipe):RecipeDTO{
    const recetaDTO = {} as RecipeDTO;
    recetaDTO.idautor = receta.idAutor;
    recetaDTO.idreceta = receta.idReceta;
    recetaDTO.nombrereceta = receta.nombreReceta;
    recetaDTO.descripcionreceta = receta.descripcionReceta;
    recetaDTO.ingredientes = receta.ingredientes;
    recetaDTO.pasosreceta = receta.pasosReceta;
    recetaDTO.imagenes = receta.imagenes;
    recetaDTO.autor = receta.autor;
    recetaDTO.tags = receta.tags;
    return recetaDTO;
  }

  mapRecipeDTOToRecipe(recetaDTO: RecipeDTO): Recipe {
    const receta = {} as Recipe;
    receta.idAutor = recetaDTO.idautor;
    receta.idReceta = recetaDTO.idreceta;
    receta.nombreReceta = recetaDTO.nombrereceta;
    receta.descripcionReceta = recetaDTO.descripcionreceta;
    receta.ingredientes = recetaDTO.ingredientes;
    receta.pasosReceta = recetaDTO.pasosreceta;
    receta.imagenes = recetaDTO.imagenes;
    receta.autor = recetaDTO.autor;
    receta.tags = recetaDTO.tags;
    return receta;
  }

}
