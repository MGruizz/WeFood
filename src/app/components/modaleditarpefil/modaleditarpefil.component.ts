import {Component, Inject, NgModule, OnInit} from '@angular/core';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {UserLogeado, UserLogeadoDTO, UsuarioEdit} from "../../services/user/user.type";
import {AuthService} from "../../services/auth/auth.service";
import {UserMapper} from "../../services/user/user.mapper";


@Component({
  selector: 'app-modaleditarpefil',
  templateUrl: './modaleditarpefil.component.html',
  styleUrls: ['./modaleditarpefil.component.scss']
})
export class ModaleditarpefilComponent implements OnInit {
  usuario: UserLogeado= {} as UserLogeado;
  formularioEditPerfilForm : FormGroup = {} as FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private Ref:MatDialogRef<ModaleditarpefilComponent>,
              private formBuilder: FormBuilder,
              private userService:UserService,
              private authService: AuthService,
              private userMapper:UserMapper) { }

  ngOnInit(): void {
    let form ={
      username: [this.data.nombreUsuario, Validators.compose([
        Validators.pattern(/^.{1,20}$/),
        Validators.required
      ])],
      descripcion: [this.data.descripcion, Validators.compose([
        Validators.pattern(/^.{0,}$/),
        Validators.required
      ])],
    }

    this.formularioEditPerfilForm = this.formBuilder.group(form);
  }

  cerrarPopUp(){
    this.userService.getUserById().subscribe((value) => {
      if(typeof value == "string"){
        this.usuario = JSON.parse(value);
      }
      else{
        this.usuario = value;
      }
    })
    let user = {
      idUsuario : this.usuario.idUsuario,
      nombreUsuario: this.formularioEditPerfilForm.get('username')!.value,
      descripcion: this.formularioEditPerfilForm.get('descripcion')!.value
    };
    this.userService.editarInformacionUsuario(user).subscribe(res =>{
      this.userService.user  = this.userMapper.mapUserLogeadoDTOToUsuario(res.body as UserLogeadoDTO)
      localStorage.removeItem('user');
      localStorage.setItem('user',JSON.stringify(this.userService.getUser()));
    })
    this.Ref.close(user);
  }

}
