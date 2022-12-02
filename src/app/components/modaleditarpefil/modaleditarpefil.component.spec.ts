import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleditarpefilComponent } from './modaleditarpefil.component';

describe('ModaleditarpefilComponent', () => {
  let component: ModaleditarpefilComponent;
  let fixture: ComponentFixture<ModaleditarpefilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaleditarpefilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaleditarpefilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
