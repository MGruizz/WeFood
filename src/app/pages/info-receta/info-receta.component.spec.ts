import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRecetaComponent } from './info-receta.component';

describe('InfoRecetaComponent', () => {
  let component: InfoRecetaComponent;
  let fixture: ComponentFixture<InfoRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRecetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
