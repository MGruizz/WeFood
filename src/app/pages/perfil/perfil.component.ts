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
    let aux=0;
    for (let user of this.userService.usuariosLogeados) {
      if (user.idUsuario == 1){
        this.usuario = user;

      }

    }
    for (let i in this.recipeService.recetas) {
      if (this.usuario.idUsuario== this.recipeService.recetas[i].idAutor){
        this.recetas[aux] = this.recipeService.recetas[i];
        aux++;
      }

    }
    console.log(this.recetas)

  }

}
