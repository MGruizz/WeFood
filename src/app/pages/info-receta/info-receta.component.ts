import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../services/recipe/recipe.type";
import {RecipesService} from "../../services/recipe/recipes.service";
import {Router} from "@angular/router";
import {UserLogeado} from "../../services/user/user.type";
import {UserService} from "../../services/user/user.service";
import {TagService} from "../../services/tag/tag.service";
import {Tag} from "../../services/tag/tag.type";
import {ComentariosService} from "../../services/comentarios/comentarios.service";
import {NuevoComentario} from "../../services/comentarios/comentarios.type";

@Component({
  selector: 'app-info-receta',
  templateUrl: './info-receta.component.html',
  styleUrls: ['./info-receta.component.scss'],
})
export class InfoRecetaComponent implements OnInit {
  receta: Recipe= {} as Recipe;
  constructor(private recipeService: RecipesService, private router: Router, private userService: UserService,
              private comentarioService: ComentariosService) { }

  ngOnInit(): void {
    console.log(history.state.data);
    console.log(history.state);
    this.recipeService.sharedData.subscribe(recipe =>{
      this.receta = recipe;
      console.log(this.receta);
    })



    }
  // comentarReceta(){
  //
  //   let comentario: NuevoComentario = {
  //     comentario: 'obtener valor del html',
  //     nombreAutor: this.userService.getUser()?.nombrePersona!
  //   }
  //   this.comentarioService.guardarComentario(comentario).subscribe(res =>{
  //     console.log(res)
  //   })
  // }
}
