import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsMenuComponent } from './alerts-menu.component';

describe('AlertsMenuComponent', () => {
  let component: AlertsMenuComponent;
  let fixture: ComponentFixture<AlertsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
