import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import {Router} from '@angular/router';
import {RegistroUsuario} from "../../services/user/user.type";
import {UserService} from "../../services/user/user.service";
import {ModaleditarpefilComponent} from "../../components/modaleditarpefil/modaleditarpefil.component";
import {MatDialog} from "@angular/material/dialog";
import {ModalerrorComponent} from "../../components/modalerror/modalerror.component";

@Component({
  selector: 'app-creacion-usuario',
  templateUrl: './creacion-usuario.component.html',
  styleUrls: ['./creacion-usuario.component.scss']
})
export class CreacionUsuarioComponent implements OnInit {
  formularioCreacionUsuarioForm : FormGroup = {} as FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService : UserService, private matdialog:MatDialog) { }

  ngOnInit(): void {
    let form ={
      username: ['', Validators.compose([
        Validators.pattern(/^.{1,20}$/),
        Validators.required
      ])],
      //Debe tener 1 punto,Despues del . debe tener 2 letras, lo que viene despues del @ debe tener minimo 1 letra
      email: ['', Validators.compose([
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        Validators.required
      ])],
      passwords: this.formBuilder.group({
        password: ['', Validators.compose([
          Validators.pattern(/^.{5,}$/),
          Validators.required
        ])],
        confirmPassword: ['', Validators.compose([
          Validators.pattern(/^.{5,}$/),
          Validators.required,
        ])]
      },{validators:this.checkPasswords})
    }

    this.formularioCreacionUsuarioForm = this.formBuilder.group(form);
  }

  abrirModal(mensaje:string,titulo:string){
    let mensajeError: string;
    const popup = this.matdialog.open(ModalerrorComponent, {
      width: '20%',
      data: {
        titulo: titulo,
        mensajeError: mensaje
      }
    });
    popup.afterClosed().subscribe(res =>{
      console.log(res);
    })
  }

  registrarse(){
    console.log(this.formularioCreacionUsuarioForm.status);
    if (this.formularioCreacionUsuarioForm.status === 'VALID'){
      let usuarioRegistrado={} as RegistroUsuario
      usuarioRegistrado={
        nombrePersona: this.formularioCreacionUsuarioForm.get('username')!.value,
        correoElectronico: this.formularioCreacionUsuarioForm.get('email')!.value,
        password: this.formularioCreacionUsuarioForm.get('passwords.password')!.value
      }
      this.userService.registrarUsuario(usuarioRegistrado).subscribe((res)=>{
        if(res.status == '200'){
          console.log(res.body.res)
          this.abrirModal(res.body.res,'Felicidades');
          this.router.navigate(['/login']);
        }
      },
        (error)=>{
        console.log(error)
          this.abrirModal(error.error,'Ocurrio un error');
        });
    }

  }



  //Verifica que las password sean iguales.
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value

    return pass === confirmPass ? null : { notSame: true }
  }

  get controls(){
    return this.formularioCreacionUsuarioForm.controls;
  }

  get passwordsControls(){
    return ((this.formularioCreacionUsuarioForm.get('passwords') as FormGroup).controls)
  }
}
