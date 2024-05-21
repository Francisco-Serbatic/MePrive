import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensibleFormComponent } from './extensible-form.component';

describe('ExtensibleFormComponent', () => {
  let component: ExtensibleFormComponent;
  let fixture: ComponentFixture<ExtensibleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtensibleFormComponent]
    });
    fixture = TestBed.createComponent(ExtensibleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
