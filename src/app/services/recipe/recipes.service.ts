import {Recipe} from "./recipe.type";
import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class RecipesService implements OnInit {
  recetasUrl: string = '../assets/data/recetas.json';

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {

  }

  cargarRecetas(): Observable<any> {
    return this.httpClient.get(this.recetasUrl)
  }

  getUserRecipes(idUsuario: number, recetas: Recipe[]): Recipe[] {
    let recetasUsuario: Recipe[] = [];
    recetasUsuario = [];
    for (let i in recetas) {
      if (idUsuario == recetas[i].idAutor) {
        recetasUsuario.push(recetas[i]);
      }
    }
    return recetasUsuario;
  }

  getRecipeById(idRecipe: number, recetas: Recipe[]): Recipe {
    let recipe = {} as Recipe
    for (let i in recetas) {
      if (idRecipe == recetas[i].idReceta) {
        return recetas[i];
      }
    }
    return recipe;
  }
}
