import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {UserService} from "../../services/user/user.service";
import {UserLogeado} from "../../services/user/user.type";
import {UserMapper} from "../../services/user/user.mapper";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router, NavigationExtras} from "@angular/router";
import {RecipesService} from "../../services/recipe/recipes.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  formularioSearchForm: FormGroup = {} as FormGroup;
  constructor(
    private authService: AuthService,
    private userMapper: UserMapper,
    private formBuilder: FormBuilder,
    private router:Router,
    private recipeService: RecipesService
  ) {
  }

  ngOnInit(): void {
    let form = {
      palabraClave: ['', Validators.compose([
        Validators.pattern(/^.{1,30}$/),
        Validators.required
      ])],
    }

    this.formularioSearchForm = this.formBuilder.group(form)
  }

  logOut() {
    this.authService.logOut();
  }

  estaLogeado(): boolean {
    if (this.authService.loggedIn()) {
      return true
    }
    return false
  }
  esAdmin(): boolean{
    console.log(JSON.parse(this.authService.getUser()!));
    let usuario: UserLogeado=  JSON.parse(this.authService.getUser()!);
    console.log(usuario)
    if(usuario.isAdmin){
      return true;
    }
    return false;
  }

  buscar() {
    console.log(this.formularioSearchForm.status);
    if (this.formularioSearchForm.status === 'VALID') {
      this.router.routeReuseStrategy.shouldReuseRoute=()=>false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/buscador'], { state: { palabraclave: this.formularioSearchForm.get('palabraClave')!.value }});
    } else {
      console.log('Error al realizar la búsqueda');
    }
  }

}
