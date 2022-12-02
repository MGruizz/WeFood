import { Component, OnInit } from '@angular/core';
import {RecipesService} from "../../services/recipe/recipes.service";
import {Recipe, RecipeDTO} from "../../services/recipe/recipe.type";
import {ActivatedRoute, Route, Router, Routes} from "@angular/router";
import {Tag, TagDTO} from "../../services/tag/tag.type";
import {TagMapper} from "../../services/tag/tag.mapper";
import {RecipeMapper} from "../../services/recipe/recipe.mapper";
import {TagService} from "../../services/tag/tag.service";

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {
  recipe: Recipe = {} as Recipe;
  totalRecetas: Recipe[] = [];
  palabraclave: string;

  constructor(
    private recipeMapper: RecipeMapper,
    private tagService: TagService,
    private tagMapper: TagMapper,
    private recipeService: RecipesService,
    private router: Router,
    public route: ActivatedRoute
  ) {
      this.palabraclave = history.state.palabraclave;
  }

  ngOnInit(): void {

    this.recipeService.buscarReceta(history.state.palabraclave).subscribe((res)=>{
      for (let recet of res) {
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
    });
    this.recipeService.sharedData.subscribe(recipe => this.recipe = recipe)
  }

  verDetalles(index:number){
    this.recipeService.nextRecipe(this.totalRecetas[index]);
    this.router.navigate(['/info-receta'],);
  }
}
