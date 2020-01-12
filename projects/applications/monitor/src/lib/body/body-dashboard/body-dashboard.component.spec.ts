import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyDashboardComponent } from './body-dashboard.component';

describe('BodyDashboardComponent', () => {
  let component: BodyDashboardComponent;
  let fixture: ComponentFixture<BodyDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
