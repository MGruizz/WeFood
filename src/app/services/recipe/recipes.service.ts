import {NewRecipe, Recipe, RecetaEdit} from "./recipe.type";
import {Injectable, OnInit} from "@angular/core";
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, map, Observable, of} from "rxjs";
import {RecipeMapper} from "./recipe.mapper";
import {constants} from "../../../environments/constants";
import {UserLogeado, UsuarioEdit} from "../user/user.type";

@Injectable({
  providedIn: 'root'
})

export class RecipesService implements OnInit {

  recetasUrl: string = '../assets/data/recetas.json';
  private RECETAS_ENDPOINT = '/recetas';
  private BUSCARRECETAS_ENDPOINT = '/buscarRecetas';
  private RECETAS_EDIT_ENDPOINT = '/editreceta';
  private RECETAS_ELIMINAR_ENDPOINT = '/eliminarreceta';
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

  getRecipesByUserId(idUsuario :number): Observable<any>{
    return this.httpClient.get(constants.API_URL+this.RECETAS_ENDPOINT+'/'+idUsuario)
  }

  buscarReceta(palabraclave: string): Observable<any>{
    return this.httpClient.get(constants.API_URL+this.BUSCARRECETAS_ENDPOINT+'/'+palabraclave)
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

  /*
  getRecipeById(idRecipe: number, recetas: Recipe[]): Recipe {
    let recipe = {} as Recipe
    for (let i in recetas) {
      if (idRecipe == recetas[i].idReceta) {
        return recetas[i];
      }
    }
    return recipe;
  }*/

  guardarReceta(receta: NewRecipe):Observable<any>{
    const body = receta;
    return this.httpClient.post(constants.API_URL + this.RECETAS_ENDPOINT,body,{ headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')}),observe: 'response'})
  }

  nextRecipe(recipe: Recipe){
    this.getDataSubject.next(recipe);
  }

  editarInformacionReceta (recipe : RecetaEdit){
    const body = recipe;
    const url = constants.API_URL + this.RECETAS_EDIT_ENDPOINT;
    return this.httpClient.put(url,body,{ headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')}),observe: 'response'})
  }

  eliminarReceta(id: number){
    const url = constants.API_URL + this.RECETAS_ELIMINAR_ENDPOINT + '/' +id;
    return this.httpClient.delete(url,{ headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')}),observe: 'response'})
  }

}
