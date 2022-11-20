import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  formularioLoginForm : FormGroup = {} as FormGroup;

  constructor(private formBuilder: FormBuilder, private router:Router, private userService:UserService) { }

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
      console.log(this.formularioLoginForm.get('userName')!.value,this.formularioLoginForm.get('password')!.value)
      this.userService.iniciarSesion(this.formularioLoginForm.get('userName')!.value,this.formularioLoginForm.get('password')!.value).subscribe((res)=>{
        console.log('res: ',res);
        console.log('res: ',res.body.token);
        if(res.status == '200'){
          localStorage.setItem('token',res.body.token);
          this.router.navigate(['/inicio']);
        }
      })
    }

  }
}
