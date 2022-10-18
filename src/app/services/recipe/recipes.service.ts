import {Recipe} from "./recipe.type";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class RecipesService{
  recetas : Recipe[] = [];
  recetasUrl : string = '../assets/data/recetas.json';
  constructor(private httpClient:HttpClient) {
    this.httpClient.get(this.recetasUrl).subscribe((value)=>{
      this.recetas = value as Recipe[];
    })
  }
}
