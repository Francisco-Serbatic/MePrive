import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakfastPresentationComponent } from './breakfast-presentation.component';

describe('BreakfastPresentationComponent', () => {
  let component: BreakfastPresentationComponent;
  let fixture: ComponentFixture<BreakfastPresentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreakfastPresentationComponent]
    });
    fixture = TestBed.createComponent(BreakfastPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
