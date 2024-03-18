import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroImagesComponent } from './intro-images.component';

describe('IntroImagesComponent', () => {
  let component: IntroImagesComponent;
  let fixture: ComponentFixture<IntroImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntroImagesComponent]
    });
    fixture = TestBed.createComponent(IntroImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
