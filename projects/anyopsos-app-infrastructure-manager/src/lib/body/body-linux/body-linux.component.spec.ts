import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyLinuxComponent } from './body-linux.component';

describe('BodyLinuxComponent', () => {
  let component: BodyLinuxComponent;
  let fixture: ComponentFixture<BodyLinuxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyLinuxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyLinuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
