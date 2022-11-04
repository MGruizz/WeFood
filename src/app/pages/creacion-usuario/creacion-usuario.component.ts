import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-creacion-usuario',
  templateUrl: './creacion-usuario.component.html',
  styleUrls: ['./creacion-usuario.component.scss']
})
export class CreacionUsuarioComponent implements OnInit {
  formularioCreacionUsuarioForm : FormGroup = {} as FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) { }

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

  registrarse(){
    console.log(this.formularioCreacionUsuarioForm.status);

    if (this.formularioCreacionUsuarioForm.status === 'VALID'){
      this.router.navigate(['/inicio'])
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
