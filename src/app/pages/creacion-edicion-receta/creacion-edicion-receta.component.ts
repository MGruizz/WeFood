import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-creacion-edicion-receta',
  templateUrl: './creacion-edicion-receta.component.html',
  styleUrls: ['./creacion-edicion-receta.component.scss']
})
export class CreacionEdicionRecetaComponent implements OnInit {
  formularioCreacionRecetaForm : FormGroup = {} as FormGroup;
  constructor(private formBuilder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    let form = {
      nombreReceta: ['', Validators.compose([
        Validators.pattern(/^.{1,30}$/),
        Validators.required
      ])],
      descripcionReceta:['', Validators.compose([
        Validators.required
      ])],
      ingredientes:['', Validators.compose([
        Validators.required
      ])],
      pasosReceta:['', Validators.compose([
        Validators.required
      ])],
    }
    this.formularioCreacionRecetaForm = this.formBuilder.group(form);
  }
  publicar(){
    console.log(this.formularioCreacionRecetaForm.status);
    if(this.formularioCreacionRecetaForm.status === 'VALID'){
      this.router.navigate(['/inicio'])
    }
  }
}
