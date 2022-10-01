import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  formularioLoginForm : FormGroup = {} as FormGroup;

  constructor(private formBuilder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    let form ={
      userName: ['', Validators.compose([
        Validators.pattern(/^.{1,20}$/),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.pattern(/^.{5,}$/),
        Validators.required
      ])],
    }

    this.formularioLoginForm = this.formBuilder.group(form);
  }

  iniciarSesion(){
    console.log(this.formularioLoginForm.status);
    if(this.formularioLoginForm.status === 'VALID'){
      this.router.navigate(['/inicio'])
    }
  }
}
