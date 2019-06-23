import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsServerComponent } from './actions-server.component';

describe('ActionsServerComponent', () => {
  let component: ActionsServerComponent;
  let fixture: ComponentFixture<ActionsServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
