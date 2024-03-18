import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealContainerComponent } from './meal-container.component';

describe('MealContainerComponent', () => {
  let component: MealContainerComponent;
  let fixture: ComponentFixture<MealContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealContainerComponent]
    });
    fixture = TestBed.createComponent(MealContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
