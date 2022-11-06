import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../services/recipe/recipe.type";
import {RecipesService} from "../../services/recipe/recipes.service";
import {UserService} from "../../services/user/user.service";
import {UserLogeado} from "../../services/user/user.type";
import {Router} from "@angular/router";
import {DietsService} from "../../services/diet/diet.service";
import {Diet} from "../../services/diet/diet.type";

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
  totalDietas: Diet[] = [];
  dietasUsuario: Diet[] = [];
  constructor(private recipeService:RecipesService, private userService:UserService, private router:Router, private dietService: DietsService) {

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

    this.dietService.cargarDiets().subscribe((value)=>{
      this.totalDietas = value as Diet[];
      this.dietasUsuario = this.dietService.buscarDietasUsuario(this.usuario.idUsuario, this.totalDietas, this.totalRecetas);
    })
    console.log(this.totalDietas);
    console.log(this.dietasUsuario);

    this.recipeService.sharedData.subscribe(recipe => this.recipe = recipe)
    console.log(this.recetas)
  }

  verDetalles(index:number){
    this.recipeService.nextRecipe(this.recetas[index]);
    this.router.navigate(['/info-receta'])
  }
}
