import {Injectable} from "@angular/core";
import {NewRecipe, Recipe, RecipeDTO} from "./recipe.type";

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
    recetaDTO.nombrepersona = receta.autor;
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
    receta.autor = recetaDTO.nombrepersona;
    receta.tags = recetaDTO.tags;
    return receta;
  }

  mapDatatoCreateRecipe(nombreReceta:string, descripcionReceta:string,ingredientes:string,pasosReceta:string, tags:number[]):NewRecipe{
    const recipe = {} as NewRecipe;
    recipe.nombrereceta = nombreReceta;
    recipe.descripcionreceta = descripcionReceta;
    recipe.pasosrecetas = pasosReceta;
    recipe.ingredientes = ingredientes;
    recipe.tags = tags;
    return recipe;
  }

}
