import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Tag, TagDTO} from "../../services/tag/tag.type";
import {TagService} from "../../services/tag/tag.service";
import {UserLogeado} from "../../services/user/user.type";

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, Observable, startWith} from 'rxjs';
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {RecipesService} from "../../services/recipe/recipes.service";
import {TagMapper} from "../../services/tag/tag.mapper";
import {NewRecipe} from "../../services/recipe/recipe.type";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-creacion-edicion-receta',
  templateUrl: './creacion-edicion-receta.component.html',
  styleUrls: ['./creacion-edicion-receta.component.scss']
})
export class CreacionEdicionRecetaComponent implements OnInit {

  tags: Tag[] = [];
  formularioCreacionRecetaForm : FormGroup = {} as FormGroup;
  tagsName: string[] = [];
  tagsEnMuestra: string[] = ['Carne','Vegetariano'];
  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> | undefined;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private formBuilder: FormBuilder, private router:Router, private tagService: TagService, private recipesService:RecipesService,
              private tagMapper : TagMapper) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.tagsName.slice())),
    );
  }

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
      imagen:['', Validators.compose([
        Validators.required
      ])],
    }
    this.formularioCreacionRecetaForm = this.formBuilder.group(form);

    this.tagService.cargarTags().subscribe((value)=>{
      for (let tag of value) {
        this.tags.push(this.tagMapper.mapTagDtoToTag(tag as TagDTO));
      }
      for(let i in this.tags){
        this.tagsName.push(this.tags[i].nombreTag);
      }
    })

  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value && this.tagsName.includes(value)) {
      this.tagsEnMuestra.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tagsEnMuestra.indexOf(tag);

    if (index >= 0) {
      this.tagsEnMuestra.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.tagsEnMuestra.includes(event.option.viewValue)) {
      this.tagsEnMuestra.push(event.option.viewValue);
    }
    this.tagInput!.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tagsName.filter(tag => tag.toLowerCase().includes(filterValue));
  }



  publicar(){
    console.log(this.formularioCreacionRecetaForm.status);
    let imagenReceta = this.formularioCreacionRecetaForm.get('imagen')!.value
    if(imagenReceta.length == 0){
      imagenReceta = 'https://media.discordapp.net/attachments/1013532354725281872/1020105421404508190/WeFood_Mascot_Sad.png?width=985&height=554'
    }
    let tagsToBack = this.tagMapper.mapStringToTag(this.tagsEnMuestra,this.tags);
    if(this.formularioCreacionRecetaForm.status === 'VALID'){
      const recipe:NewRecipe = {
        nombrereceta:this.formularioCreacionRecetaForm.get('nombreReceta')!.value,
        descripcionreceta:this.formularioCreacionRecetaForm.get('descripcionReceta')!.value,
        ingredientes:this.formularioCreacionRecetaForm.get('ingredientes')!.value,
        pasosrecetas:this.formularioCreacionRecetaForm.get('pasosReceta')!.value,
        imagenes: imagenReceta,
        tags:tagsToBack
      }
      this.recipesService.guardarReceta(recipe).subscribe((res)=>{
        console.log(res.status);
        console.log(res.body);
        console.log(res);
        if(res.status == '201'){
          this.router.navigate(['/perfil']);
        }
        else{
          console.log('Error en la insersion');
        }
      })


    }
  }
}
