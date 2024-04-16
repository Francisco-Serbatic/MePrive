import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaFormsComponent } from './prueba-forms.component';

describe('PruebaFormsComponent', () => {
  let component: PruebaFormsComponent;
  let fixture: ComponentFixture<PruebaFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PruebaFormsComponent]
    });
    fixture = TestBed.createComponent(PruebaFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
