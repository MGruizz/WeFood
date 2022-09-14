import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionEdicionRecetaComponent } from './creacion-edicion-receta.component';

describe('CreacionEdicionRecetaComponent', () => {
  let component: CreacionEdicionRecetaComponent;
  let fixture: ComponentFixture<CreacionEdicionRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionEdicionRecetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionEdicionRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
