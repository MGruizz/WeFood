import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
      email: ['', Validators.compose([
        Validators.pattern(/^.[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.pattern(/^.{5,}$/),
        Validators.required
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.pattern(/^.{5,}$/),
        Validators.required
      ])],
    }

    this.formularioCreacionUsuarioForm = this.formBuilder.group(form);
  }

  registrarse(){
    console.log(this.formularioCreacionUsuarioForm.status);
    if (this.formularioCreacionUsuarioForm.status === 'VALID'){
      this.router.navigate(['/inicio'])
    }
  }
}
