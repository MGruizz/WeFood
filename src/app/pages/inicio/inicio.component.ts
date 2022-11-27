import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../services/recipe/recipe.type";
import {RecipesService} from "../../services/recipe/recipes.service";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {RecipeDTO} from "../../services/recipe/recipe.type";
import {RecipeMapper} from "../../services/recipe/recipe.mapper";
import {Tag, TagDTO} from "../../services/tag/tag.type";
import {TagService} from "../../services/tag/tag.service";
import {TagMapper} from "../../services/tag/tag.mapper";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})


export class InicioComponent implements OnInit {
  recipe: Recipe = {} as Recipe;
  totalRecetas: Recipe[] = [];
  constructor(private recipeService:RecipesService, private router: Router, private recipeMapper: RecipeMapper,
              private tagService: TagService, private tagMapper:TagMapper) { }

  ngOnInit(): void {

    this.recipeService.getRecipes().subscribe((value) => {
      for (let recet of value) {
        let receta = this.recipeMapper.mapRecipeDTOToRecipe(recet as RecipeDTO);
        this.tagService.getTagsByRecipeID(receta.idReceta).subscribe((value) => {
          let tags: Tag[] = [];
          if(value.res.length > 0){
            for (let tag of value.res) {
              tags.push(this.tagMapper.mapTagDtoToTag(tag as TagDTO));
            }
          }
          receta.tags = tags;
          this.totalRecetas.push(receta);
        })
      }
      console.log(this.totalRecetas)
    })
    this.recipeService.sharedData.subscribe(recipe => this.recipe = recipe)
  }

  verDetalles(index:number){
    this.recipeService.nextRecipe(this.totalRecetas[index]);
    this.router.navigate(['/info-receta'],);
  }
}
