import { Component, OnInit } from '@angular/core';
import {Recipe, RecipeDTO} from "../../services/recipe/recipe.type";
import {RecipesService} from "../../services/recipe/recipes.service";
import {UserService} from "../../services/user/user.service";
import {UserLogeado, UserLogeadoDTO} from "../../services/user/user.type";
import {Router} from "@angular/router";
import {UserMapper} from "../../services/user/user.mapper";
import {RecipeMapper} from "../../services/recipe/recipe.mapper";
import {TagService} from "../../services/tag/tag.service";
import {Tag, TagDTO} from "../../services/tag/tag.type";
import {TagMapper} from "../../services/tag/tag.mapper";


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  recetas : Recipe[] = [];
  usuario: UserLogeado= {} as UserLogeado;
  usuariosLogeados: UserLogeado[] = [];
  recipe: Recipe = {} as Recipe;
  constructor(private recipeService:RecipesService, private userService:UserService, private router:Router,
              private userMapper:UserMapper, private recipeMapper: RecipeMapper, private tagService:TagService,
              private tagMapper: TagMapper) {

  }

  ngOnInit(): void {
    // this.userService.cargarUsers().subscribe((value)=>{
    //   this.usuariosLogeados = (value as UserLogeado[]);
    //   this.usuario = this.userService.buscarUsuario(1,this.usuariosLogeados);
    //   console.log(this.usuario);
    // })
    this.userService.getUserById().subscribe((value) => {
      this.usuario = this.userMapper.mapUserLogeadoDTOToUsuario(value as UserLogeadoDTO);
      this.recipeService.getRecipesByUserId(this.usuario.idUsuario).subscribe((value) => {
        for (let recet of value) {
          let receta = this.recipeMapper.mapRecipeDTOToRecipe(recet as RecipeDTO);
          this.tagService.getTagsByRecipeID(receta.idReceta).subscribe((value) => {
            let tags: Tag[] = [];
            for (let tag of value) {
              tags.push(this.tagMapper.mapTagDtoToTag(tag as TagDTO));
            }
            receta.tags = tags;
            this.recetas.push(receta);
          })

        }
        //console.log(this.recetas)
      })

    })


    this.recipeService.sharedData.subscribe(recipe => this.recipe = recipe)
    console.log(this.recipe)
  }

  verDetalles(index:number){
    this.recipeService.nextRecipe(this.recetas[index]);
    this.router.navigate(['/info-receta'])
  }
}
