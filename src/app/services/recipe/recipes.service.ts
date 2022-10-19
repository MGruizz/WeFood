import {Recipe} from "./recipe.type";
import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class RecipesService implements OnInit{
  recetas : Recipe[] = [];
  recetasUrl : string = '../assets/data/recetas.json';
  recetasUsuario: Recipe[] = [];
  constructor(private httpClient:HttpClient) {

  }

  ngOnInit() {

  }

  cargarRecetas(): void{
    this.httpClient.get(this.recetasUrl).subscribe((value)=>{
      this.recetas = value as Recipe[];
    })
    console.log(this.recetas);
  }

  getUserRecipes(idUsuario: number): Recipe[]{
    this.recetasUsuario = [];
    if(this.recetas.length == 0){
      this.cargarRecetas();
    }
    for (let i in this.recetas) {
      if (idUsuario == this.recetas[i].idAutor){
        this.recetasUsuario.push(this.recetas[i]);
      }
    }
    return this.recetasUsuario;
  }
}
