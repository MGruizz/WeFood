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
  formularioCreacionTagForm : FormGroup = {} as FormGroup;
  formularioEdicionTagForm : FormGroup = {} as FormGroup;
  tagsEnMuestra: string[] = [];
  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> | undefined;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private tagService: TagService , private tagMapper: TagMapper,private formBuilder: FormBuilder) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.tagsName.slice())),
    );
  }

  ngOnInit(): void {
    let formularioNuevo = {
      tagNuevo: ['', Validators.compose([
        Validators.pattern(/^.{1,30}$/)
      ])]
    }
    let formularioEdicion = {
      nombreNuevo: ['', Validators.compose([
        Validators.pattern(/^.{1,30}$/),
      ])]
    }
    this.tagService.cargarTags().subscribe((value)=>{
      for (let tag of value) {
        this.tags.push(this.tagMapper.mapTagDtoToTag(tag as TagDTO));
      }
      for(let i in this.tags){
        this.tagsName.push(this.tags[i].nombreTag);
      }
    })

    this.formularioCreacionTagForm = this.formBuilder.group(formularioNuevo);
    this.formularioEdicionTagForm = this.formBuilder.group(formularioEdicion);
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value && this.tagsName.includes(value) ) {
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
    if (!this.tagsEnMuestra.includes(event.option.viewValue) && this.tagsEnMuestra.length<1 ) {
      this.tagsEnMuestra.push(event.option.viewValue);
    }
    this.tagInput!.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tagsName.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  editarTag(): void {
    if (this.formularioEdicionTagForm.status=="VALID"){
      let tagABack= this.tagMapper.mapStringToTag(this.tagsEnMuestra,this.tags)[0]
      console.log(tagABack)
      this.tagService.editarTag(tagABack,this.formularioEdicionTagForm.get('nombreNuevo')!.value).subscribe(res=>{
        console.log(res)
      });
    }
  }
}
