import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../services/recipe/recipe.type";
import {RecipesService} from "../../services/recipe/recipes.service";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})


export class InicioComponent implements OnInit {
  recipe: Recipe = {} as Recipe;
  recetas : Recipe[] = [];
  totalRecetas: Recipe[] = [];
  constructor(private recipeService:RecipesService, private router: Router) { }

  ngOnInit(): void {
    this.recipeService.cargarRecetas().subscribe((value)=>{
      this.totalRecetas = value as Recipe[];
      this.recetas = this.recipeService.getUserRecipes(1,this.totalRecetas);
    })
    this.recipeService.sharedData.subscribe(recipe => this.recipe = recipe)
  }

  verDetalles(index:number){
    this.recipeService.nextRecipe(this.recetas[index]);
    this.router.navigate(['/info-receta'],{state:{data:this.recetas[index]}});
  }
}
