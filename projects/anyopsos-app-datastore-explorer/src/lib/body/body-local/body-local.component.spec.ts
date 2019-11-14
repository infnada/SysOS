import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyLocalComponent } from './body-local.component';

describe('BodyLocalComponent', () => {
  let component: BodyLocalComponent;
  let fixture: ComponentFixture<BodyLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
