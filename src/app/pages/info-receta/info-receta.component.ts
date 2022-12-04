import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../services/recipe/recipe.type";
import {RecipesService} from "../../services/recipe/recipes.service";
import {Router} from "@angular/router";
import {UserLogeado} from "../../services/user/user.type";
import {UserService} from "../../services/user/user.service";
import {TagService} from "../../services/tag/tag.service";
import {Tag} from "../../services/tag/tag.type";
import {ComentariosService} from "../../services/comentarios/comentarios.service";
import {Comentario, NuevoComentario} from "../../services/comentarios/comentarios.type";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-info-receta',
  templateUrl: './info-receta.component.html',
  styleUrls: ['./info-receta.component.scss'],
})
export class InfoRecetaComponent implements OnInit {
  receta: Recipe = {} as Recipe;
  formularioComentariosForm: FormGroup = {} as FormGroup;
  usuario: UserLogeado= {} as UserLogeado;

  constructor(private recipeService: RecipesService, private router: Router, private userService: UserService,
              private comentarioService: ComentariosService, private formBuilder: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
    let form = {
      comentario: ['', Validators.compose([
        Validators.pattern(/^.{1,500}$/),
        Validators.required
      ])],
    }
    this.recipeService.sharedData.subscribe(recipe => {
      this.receta = recipe;
    });
    this.userService.getUserById().subscribe((value) => {
      if (typeof value == "string") {
        this.usuario = JSON.parse(value);
      } else {
        this.usuario = value;
      }
    })
    this.formularioComentariosForm = this.formBuilder.group(form);

  }

  comentarReceta() {
    if (this.formularioComentariosForm.status=== 'VALID'){
      let comentario: NuevoComentario = {
        comentario: this.formularioComentariosForm.get('comentario')!.value,
        nombreAutor: this.usuario.nombrePersona,
        idReceta: this.receta.idReceta,
      }
      this.comentarioService.guardarComentario(comentario).subscribe(res => {
        console.log(res);
      })
      this.router.navigate(['/perfil'])

    }

  }
  estaLogeado():boolean{
    return this.authService.loggedIn();
  }
}
