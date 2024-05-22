import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuTabsComponent } from './admin-menu-tabs.component';

describe('AdminMenuTabsComponent', () => {
  let component: AdminMenuTabsComponent;
  let fixture: ComponentFixture<AdminMenuTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMenuTabsComponent]
    });
    fixture = TestBed.createComponent(AdminMenuTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
