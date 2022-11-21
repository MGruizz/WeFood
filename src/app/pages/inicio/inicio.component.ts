import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../services/recipe/recipe.type";
import {RecipesService} from "../../services/recipe/recipes.service";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {RecipeDTO} from "../../services/recipe/recipe.type";
import {RecipeMapper} from "../../services/recipe/recipe.mapper";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})


export class InicioComponent implements OnInit {
  recipe: Recipe = {} as Recipe;
  recetas : Recipe[] = [];
  totalRecetas: Recipe[] = [];
  constructor(private recipeService:RecipesService, private router: Router, private recipeMapper: RecipeMapper) { }

  ngOnInit(): void {

    this.recipeService.getRecipes().subscribe((value) => {
      console.log(value);
      for (let receta of value ){
        this.totalRecetas.push(this.recipeMapper.mapRecipeDTOToRecipe(receta as RecipeDTO));
      }
      console.log(this.totalRecetas);
    })
    this.recipeService.sharedData.subscribe(recipe => this.recipe = recipe)
  }

  verDetalles(index:number){
    this.recipeService.nextRecipe(this.recetas[index]);
    this.router.navigate(['/info-receta'],{state:{data:this.recetas[index]}});
  }
}
