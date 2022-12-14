import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {UserLogeadoDTO} from "../../services/user/user.type";
import {UserMapper} from "../../services/user/user.mapper";
import {MatDialog} from "@angular/material/dialog";
import {ModalerrorComponent} from "../../components/modalerror/modalerror.component";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  formularioLoginForm : FormGroup = {} as FormGroup;

  constructor(private formBuilder: FormBuilder, private router:Router, private userService:UserService, private userMapper:UserMapper,
  private matdialog:MatDialog) { }

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

  mostrarError(error:string){
    let mensajeError: string;
    const popup = this.matdialog.open(ModalerrorComponent, {
      width: '20%',
      data: {
        titulo: 'Ocurrio un error',
        mensajeError: error
      }
    });
    popup.afterClosed().subscribe(res =>{
      console.log(res);
    })
  }

  iniciarSesion(){
    //console.log(this.formularioLoginForm.status);
    if(this.formularioLoginForm.status === 'VALID'){
      //console.log(this.formularioLoginForm.get('userName')!.value,this.formularioLoginForm.get('password')!.value)
      this.userService.iniciarSesion(this.formularioLoginForm.get('userName')!.value,this.formularioLoginForm.get('password')!.value).subscribe((res)=>{
        //console.log('res: ',res);
        if(res.status == '200'){
          this.userService.user  = this.userMapper.mapUserLogeadoDTOToUsuario(res.body.user as UserLogeadoDTO)
          console.log(this.userService.getUser());
          localStorage.setItem('token',res.body.token);
          //console.log(JSON.stringify(this.userService.getUser()));
          localStorage.setItem('user',JSON.stringify(this.userService.getUser()));
          this.router.navigate(['/inicio']);
        }
      },
        (error)=>{
          this.mostrarError(error.error);
        }
      )
    }

  }
}
