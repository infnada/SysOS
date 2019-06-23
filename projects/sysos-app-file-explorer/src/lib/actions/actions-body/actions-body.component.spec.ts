import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsBodyComponent } from './actions-body.component';

describe('ActionsBodyComponent', () => {
  let component: ActionsBodyComponent;
  let fixture: ComponentFixture<ActionsBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
