import {Component, ElementRef, Inject, NgModule, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {RecipesService} from "../../services/recipe/recipes.service";
import {RecipeMapper} from "../../services/recipe/recipe.mapper";
import {Tag, TagDTO} from "../../services/tag/tag.type";
import {Recipe, RecipeDTO} from "../../services/recipe/recipe.type";
import {TagService} from "../../services/tag/tag.service";
import {TagMapper} from "../../services/tag/tag.mapper";
import {Observable, startWith, map} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";


@Component({
  selector: 'app-modaleditarreceta',
  templateUrl: './modaleditarreceta.component.html',
  styleUrls: ['./modaleditarreceta.component.scss']
})
export class ModaleditarrecetaComponent implements OnInit {
  receta: Recipe = {} as Recipe;
  formularioEditarRecetaForm: FormGroup = {} as FormGroup;

  tags: Tag[] = [];

  tagsName: string[] = [];
  tagsEnMuestra: string[] = [];
  tagsCtrl = new FormControl('');
  filteredTags: Observable<string[]>;
  @ViewChild('tagsInput') tagsInput: ElementRef<HTMLInputElement> | undefined;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private Ref:MatDialogRef<ModaleditarrecetaComponent>,
              private formBuilder: FormBuilder,
              private recipeService: RecipesService,
              private recipeMapper: RecipeMapper,
              private tagService: TagService,
              private tagMapper: TagMapper
  ) {
    this.filteredTags = this.tagsCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.tagsName.slice())),
    ) }

  ngOnInit(): void {
    console.log(this.data);
    let form = {
      nombreReceta: [this.data.nombre, Validators.compose([
        Validators.pattern(/^.{1,30}$/),
        Validators.required
      ])],
      descripcionReceta:[this.data.descripcion, Validators.compose([
        Validators.required
      ])],
      ingredientes:[this.data.ingredientes, Validators.compose([
        Validators.required
      ])],
      pasosReceta:[this.data.pasos, Validators.compose([
        Validators.required
      ])],
    }

    this.formularioEditarRecetaForm = this.formBuilder.group(form);

    this.tagService.cargarTags().subscribe((value)=>{
      for (let tg of value) {
        this.tags.push(this.tagMapper.mapTagDtoToTag(tg as TagDTO));
      }
      for(let i in this.tags){
        this.tagsName.push(this.tags[i].nombreTag);
      }
      this.tagsEnMuestra = this.data.tags.map((tag:Tag) => tag.nombreTag)
    })


  }

  cerrarPopUp(){
    let tags: Tag[] = [];
    for(let tag of this.tagsEnMuestra){
      tags.push(this.tags.find(tags => tags.nombreTag == tag)!)
    }

    let recipe = {
      idReceta: this.data.id,
      nombreReceta: this.formularioEditarRecetaForm.get('nombreReceta')!.value,
      descripcionReceta: this.formularioEditarRecetaForm.get('descripcionReceta')!.value,
      ingredientes: this.formularioEditarRecetaForm.get('ingredientes')!.value,
      pasosReceta: this.formularioEditarRecetaForm.get('pasosReceta')!.value,
      tags: tags
    };
    this.recipeService.editarInformacionReceta(recipe).subscribe(res=>{
      console.log(res);
    })
    this.Ref.close(recipe);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value && this.tagsName.includes(value)) {
      this.tagsEnMuestra.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagsCtrl.setValue(null);
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
    this.tagsInput!.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tagsName.filter(tags => tags.toLowerCase().includes(filterValue));
  }

}
