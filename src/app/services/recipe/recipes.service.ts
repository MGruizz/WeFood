import {Recipe} from "./recipe.type";
import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {RecipeMapper} from "./recipe.mapper";
import {constants} from "../../../environments/constants";

@Injectable({
  providedIn: 'root'
})

export class RecipesService implements OnInit {

  recetasUrl: string = '../assets/data/recetas.json';
  private RECETAS_ENDPOINT = '/recetas';
  private getDataSubject : BehaviorSubject<Recipe> = new BehaviorSubject({} as Recipe);
  sharedData: Observable<Recipe> = this.getDataSubject.asObservable();

  constructor(private httpClient: HttpClient, private recipeMapper: RecipeMapper) {

  }

  ngOnInit() {

  }

  cargarRecetas(): Observable<any> {
    return this.httpClient.get(this.recetasUrl)
  }

  getRecipes(): Observable<any> {
    return this.httpClient.get(constants.API_URL + this.RECETAS_ENDPOINT)
  }

  getUserRecipes(idUsuario: number, recetas: Recipe[]): Recipe[] {
    let recetasUsuario: Recipe[] = [];
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

  guardarReceta(receta: Recipe):Observable<any>{
    const body = this.recipeMapper.mapRecipeToRecipeDto(receta);
    return this.httpClient.post(this.recetasUrl + this.RECETAS_ENDPOINT,body);
  }

  nextRecipe(recipe: Recipe){
    this.getDataSubject.next(recipe);
  }
}
