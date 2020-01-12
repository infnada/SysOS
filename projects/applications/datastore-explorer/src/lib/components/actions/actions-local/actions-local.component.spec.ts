import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsLocalComponent } from './actions-local.component';

describe('ActionsLocalComponent', () => {
  let component: ActionsLocalComponent;
  let fixture: ComponentFixture<ActionsLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
