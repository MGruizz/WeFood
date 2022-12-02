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
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ModaleditarpefilComponent} from "../../components/modaleditarpefil/modaleditarpefil.component";


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
              private tagMapper: TagMapper, private matdialog:MatDialog) {

  }

  ngOnInit(): void {

    this.userService.getUserById().subscribe((value) => {
      if(typeof value == "string"){
        this.usuario = JSON.parse(value);
      }
      else{
        this.usuario = value;
      }
      this.recipeService.getRecipesByUserId(this.usuario.idUsuario).subscribe((value) => {
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
            this.recetas.push(receta);
          })
        }
      })

    })


    this.recipeService.sharedData.subscribe(recipe => this.recipe = recipe)
    //console.log(this.recipe)
  }

  verDetalles(index:number){
    this.recipeService.nextRecipe(this.recetas[index]);
    this.router.navigate(['/info-receta'])
  }

  abrirModal(){
    const popup = this.matdialog
        .open(ModaleditarpefilComponent,
          {
            width: '20%',
            data: {
              nombreUsuario: this.usuario.nombrePersona,
              descripcion: this.usuario.descripcionUsuario,
              fotoPerfil: this.usuario.fotoPerfil
            }
          }
         )
        .afterClosed()
        .subscribe((shouldReload: boolean) => {
          popup.unsubscribe();
          if (shouldReload) window.location.reload()
        });

  }
}
