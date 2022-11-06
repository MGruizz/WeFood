import {Recipe} from "./recipe.type";
import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class RecipesService implements OnInit {

  recetasUrl: string = '../assets/data/recetas.json';
  private getDataSubject : BehaviorSubject<Recipe> = new BehaviorSubject({} as Recipe);
  sharedData: Observable<Recipe> = this.getDataSubject.asObservable();
  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {

  }

  cargarRecetas(): Observable<any> {
    return this.httpClient.get(this.recetasUrl)
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

  nextRecipe(recipe: Recipe){
    this.getDataSubject.next(recipe);
  }

  getDietRecipes(idDieta: number, recetas: Recipe[]): Recipe[]{
    let recetasDieta: Recipe[] = [];
    for (let i in recetas){
      for (let j in recetas[i].idDietas!){
        if (idDieta == recetas[i].idDietas![j]){
          recetasDieta.push(recetas[i]);
        };
      }
    }
    return recetasDieta;
  }
}
