import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../services/recipe/recipe.type";
import {RecipesService} from "../../services/recipe/recipes.service";

@Component({
  selector: 'app-info-receta',
  templateUrl: './info-receta.component.html',
  styleUrls: ['./info-receta.component.scss'],
})
export class InfoRecetaComponent implements OnInit {
  receta: Recipe= {} as Recipe;
  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.recipeService.sharedData.subscribe(recipe => this.receta = recipe)
  }

}
