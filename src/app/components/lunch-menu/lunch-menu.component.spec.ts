import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchMenuComponent } from './lunch-menu.component';

describe('LunchMenuComponent', () => {
  let component: LunchMenuComponent;
  let fixture: ComponentFixture<LunchMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LunchMenuComponent]
    });
    fixture = TestBed.createComponent(LunchMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
