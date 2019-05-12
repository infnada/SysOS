import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsBodyComponent } from './alerts-body.component';

describe('AlertsBodyComponent', () => {
  let component: AlertsBodyComponent;
  let fixture: ComponentFixture<AlertsBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
