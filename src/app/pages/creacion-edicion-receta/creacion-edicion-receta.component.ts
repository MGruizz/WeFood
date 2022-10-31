import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Tag} from "../../services/tag/tag.type";
import {TagService} from "../../services/tag/tag.service";
import {UserLogeado} from "../../services/user/user.type";

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-creacion-edicion-receta',
  templateUrl: './creacion-edicion-receta.component.html',
  styleUrls: ['./creacion-edicion-receta.component.scss']
})
export class CreacionEdicionRecetaComponent implements OnInit {

  tags: Tag[] = [];
  formularioCreacionRecetaForm : FormGroup = {} as FormGroup;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private formBuilder: FormBuilder, private router:Router, private tagService: TagService) { }

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

    this.tagService.cargarTags().subscribe((value)=>{
      this.tags = (value as Tag[]);
      console.log(this.tags);
    })

  }
  publicar(){
    console.log(this.formularioCreacionRecetaForm.status);
    if(this.formularioCreacionRecetaForm.status === 'VALID'){
      this.router.navigate(['/inicio'])
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push({idTag: 2,nombreTag:value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
