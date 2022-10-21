import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../services/recipe/recipe.type";
import {RecipesService} from "../../services/recipe/recipes.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})


export class InicioComponent implements OnInit {

  recetas : Recipe[] = [];
  totalRecetas: Recipe[] = [];
  constructor(private recipeService:RecipesService) { }

  ngOnInit(): void {
    this.recipeService.cargarRecetas().subscribe((value)=>{
      this.totalRecetas = value as Recipe[];
      this.recetas = this.recipeService.getUserRecipes(1,this.totalRecetas);
    })
  }
}
