import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../services/recipe/recipe.type";
import {RecipesService} from "../../services/recipe/recipes.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  recetas : Recipe[] = [];
  constructor(private recipeService:RecipesService) { }

  ngOnInit(): void {
    this.recetas = this.recipeService.recetas;
  }

}
