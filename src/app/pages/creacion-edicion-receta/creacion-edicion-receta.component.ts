import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Tag} from "../../services/tag/tag.type";
import {TagService} from "../../services/tag/tag.service";
import {UserLogeado} from "../../services/user/user.type";

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, Observable, startWith} from 'rxjs';
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {RecipesService} from "../../services/recipe/recipes.service";

@Component({
  selector: 'app-creacion-edicion-receta',
  templateUrl: './creacion-edicion-receta.component.html',
  styleUrls: ['./creacion-edicion-receta.component.scss']
})
export class CreacionEdicionRecetaComponent implements OnInit {

  tags: Tag[] = [];
  tagsName: string[] = [];
  formularioCreacionRecetaForm : FormGroup = {} as FormGroup;
  tagsEnMuestra: string[] = ['Carne','Vegetariano'];
  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> | undefined;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private formBuilder: FormBuilder, private router:Router, private tagService: TagService, private recipesService:RecipesService) {
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
    }
    this.formularioCreacionRecetaForm = this.formBuilder.group(form);

    this.tagService.cargarTags().subscribe((value)=>{
      this.tags = (value as Tag[]);
      for(let i in this.tags){
        this.tagsName.push(this.tags[i].nombreTag);
      }
      console.log(this.tags);
    })

  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
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
    if(this.formularioCreacionRecetaForm.status === 'VALID'){
      this.router.navigate(['/inicio'])
    }
  }
}
