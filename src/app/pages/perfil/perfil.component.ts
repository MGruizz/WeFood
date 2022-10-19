import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../services/recipe/recipe.type";
import {RecipesService} from "../../services/recipe/recipes.service";
import {UserService} from "../../services/user/user.service";
import {UserLogeado} from "../../services/user/user.type";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  recetas : Recipe[] = [];
  usuario: UserLogeado= {} as UserLogeado;

  constructor(private recipeService:RecipesService, private userService:UserService) {

  }

  ngOnInit(): void {
    this.usuario = this.userService.buscarUsuario(1);
    this.recetas = this.recipeService.getUserRecipes(1);

    console.log(this.recetas)
  }
}
