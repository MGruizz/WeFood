import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TagService} from "../../services/tag/tag.service";
import {Tag, TagDTO} from "../../services/tag/tag.type";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {TagMapper} from "../../services/tag/tag.mapper";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})


export class AdminComponent implements OnInit {
  tags: Tag[] = [];
  tagsName: string[] = [];
  tagsEnMuestra: string[] = [];
  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;
  formularioCreacionTagForm: FormGroup = {} as FormGroup;
  formularioEdicionTagForm: FormGroup = {} as FormGroup;


  tagsEliminarName: string[] = [];
  tagsEliminarEnMuestra: string[] = [];
  tagsCtrlEliminar = new FormControl('');
  filteredTagsEliminar: Observable<string[]>;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('tagEliminarInput') tagEliminarInput: ElementRef<HTMLInputElement> | undefined;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private tagService: TagService, private tagMapper: TagMapper, private formBuilder: FormBuilder) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.tagsName.slice())),
    );
    this.filteredTagsEliminar = this.tagsCtrlEliminar.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filterEliminar(tag) : this.tagsEliminarName.slice())),
    );

  }

  ngOnInit(): void {
    let formularioNuevo = {
      tagNuevo: ['', Validators.compose([
        Validators.pattern(/^.{1,30}$/),
        Validators.required
      ])]
    }
    let formularioEdicion = {
      nombreNuevo: ['', Validators.compose([
        Validators.pattern(/^.{1,30}$/),
        Validators.required
      ])]
    }
    this.tagService.cargarTags().subscribe((value) => {
      for (let tag of value) {
        this.tags.push(this.tagMapper.mapTagDtoToTag(tag as TagDTO));
      }
      for (let i in this.tags) {
        this.tagsName.push(this.tags[i].nombreTag);
        this.tagsEliminarName.push(this.tags[i].nombreTag);
      }

    })

    this.formularioCreacionTagForm = this.formBuilder.group(formularioNuevo);
    this.formularioEdicionTagForm = this.formBuilder.group(formularioEdicion);
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
    if (!this.tagsEnMuestra.includes(event.option.viewValue)  && this.tagsEnMuestra.length<1) {
      this.tagsEnMuestra.push(event.option.viewValue);
    }
    this.tagInput!.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tagsName.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  crearTag(): void {
    if (this.formularioCreacionTagForm.status == "VALID") {
      let tagABack = this.formularioCreacionTagForm.get('tagNuevo')!.value
      this.tagService.crearTag(tagABack).subscribe(res => {
        console.log(res)
      });
    }
  }

  editarTag(): void {
    if (this.formularioEdicionTagForm.status == "VALID") {
      let tagABack = this.tagMapper.mapStringToTag(this.tagsEnMuestra, this.tags)[0]
      console.log(tagABack)
      this.tagService.editarTag(tagABack, this.formularioEdicionTagForm.get('nombreNuevo')!.value).subscribe(res => {
        console.log(res)
      });
    }
  }

  eliminarTag(): void {
    if (this.tagsEliminarEnMuestra.length==1){
      let tagABack =this.tagMapper.mapStringToTag(this.tagsEliminarEnMuestra, this.tags)[0]
      console.log(tagABack);
      this.tagService.eliminarTag(tagABack).subscribe(res=>{
        console.log(res)
      })
    }

  }


  addEliminar(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value && this.tagsEliminarName.includes(value)) {
      this.tagsEliminarEnMuestra.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagsCtrlEliminar.setValue(null);
  }

  removeEliminar(tag: string): void {
    const index = this.tagsEliminarEnMuestra.indexOf(tag);

    if (index >= 0) {
      this.tagsEliminarEnMuestra.splice(index, 1);
    }
  }

  selectedEliminar(event: MatAutocompleteSelectedEvent): void {
    if (!this.tagsEliminarEnMuestra.includes(event.option.viewValue) && this.tagsEliminarEnMuestra.length<1) {
      this.tagsEliminarEnMuestra.push(event.option.viewValue);
    }
    this.tagEliminarInput!.nativeElement.value = '';
    this.tagsCtrlEliminar.setValue(null);
  }

  private _filterEliminar(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tagsEliminarName.filter(tag => tag.toLowerCase().includes(filterValue));
  }


}
