import {Diet} from "./diet.type";
import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RecipesService} from "../recipe/recipes.service";
import {Recipe} from "../recipe/recipe.type";

@Injectable({
  providedIn: 'root'
})

export class DietsService {
  dietsUrl: string = "../assets/data/diets.json";
  constructor(private httpClient: HttpClient, private recipeService: RecipesService) {

  }

  cargarDiets(): Observable<any> {
    return this.httpClient.get(this.dietsUrl);
  }

  buscarDietasUsuario(idUsuario: number, diets: Diet[], recetas: Recipe[]):Diet[]{
    let dietsUsuario: Diet[] = [];
    for (let diet of diets) {
      if (diet.idAutor == idUsuario){
        diet.recetas = this.recipeService.getDietRecipes(diet.idDieta, recetas);
        dietsUsuario.push(diet);
      }
    }
    return dietsUsuario;
  }
}

