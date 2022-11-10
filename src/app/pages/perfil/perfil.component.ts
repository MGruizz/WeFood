import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../services/recipe/recipe.type";
import {RecipesService} from "../../services/recipe/recipes.service";
import {UserService} from "../../services/user/user.service";
import {UserLogeado} from "../../services/user/user.type";
import {Router} from "@angular/router";


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  recetas : Recipe[] = [];
  usuario: UserLogeado= {} as UserLogeado;
  usuariosLogeados: UserLogeado[] = [];
  totalRecetas : Recipe[] = [];
  recipe: Recipe = {} as Recipe;
  constructor(private recipeService:RecipesService, private userService:UserService, private router:Router) {

  }

  ngOnInit(): void {
    this.userService.cargarUsers().subscribe((value)=>{
      this.usuariosLogeados = (value as UserLogeado[]);
      this.usuario = this.userService.buscarUsuario(1,this.usuariosLogeados);
    })

    this.recipeService.cargarRecetas().subscribe((value)=>{
      this.totalRecetas = value as Recipe[];
      this.recetas = this.recipeService.getUserRecipes(this.usuario.idUsuario,this.totalRecetas);
    })



    this.recipeService.sharedData.subscribe(recipe => this.recipe = recipe)
    console.log(this.recipe)
  }

  verDetalles(index:number){
    this.recipeService.nextRecipe(this.recetas[index]);
    this.router.navigate(['/info-receta'])
  }
}
