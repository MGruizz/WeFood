import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleditarrecetaComponent } from './modaleditarreceta.component';

describe('ModaleditarrecetaComponent', () => {
  let component: ModaleditarrecetaComponent;
  let fixture: ComponentFixture<ModaleditarrecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaleditarrecetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaleditarrecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
