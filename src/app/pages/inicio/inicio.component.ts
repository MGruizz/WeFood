import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../services/recipe/recipe.type";
import {RecipesService} from "../../services/recipe/recipes.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})


export class InicioComponent implements OnInit {

  recetas : Recipe[] = [];
  constructor(private recipeService:RecipesService) { }

  ngOnInit(): void {
    this.recetas = this.recipeService.recetas;
  }

}
