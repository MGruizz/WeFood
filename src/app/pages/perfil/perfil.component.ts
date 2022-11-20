import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../services/recipe/recipe.type";
import {RecipesService} from "../../services/recipe/recipes.service";
import {UserService} from "../../services/user/user.service";
import {UserLogeado, UserLogeadoDTO} from "../../services/user/user.type";
import {Router} from "@angular/router";
import {UserMapper} from "../../services/user/user.mapper";


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
  constructor(private recipeService:RecipesService, private userService:UserService, private router:Router, private userMapper:UserMapper) {

  }

  ngOnInit(): void {
    // this.userService.cargarUsers().subscribe((value)=>{
    //   this.usuariosLogeados = (value as UserLogeado[]);
    //   this.usuario = this.userService.buscarUsuario(1,this.usuariosLogeados);
    //   console.log(this.usuario);
    // })
    this.userService.getUserById().subscribe((value)=>{
      // console.log(localStorage.getItem(id));
      console.log(value);
      this.usuario = this.userMapper.mapUserLogeadoDTOToUsuario(value as UserLogeadoDTO) ;
      console.log(this.usuario);
      this.recipeService.cargarRecetas().subscribe((value)=>{
        this.totalRecetas = value as Recipe[];
        this.recetas = this.recipeService.getUserRecipes(this.usuario.idUsuario,this.totalRecetas);
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
