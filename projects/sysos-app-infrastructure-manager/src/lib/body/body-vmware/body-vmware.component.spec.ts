import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyVmwareComponent } from './body-vmware.component';

describe('BodyVmwareComponent', () => {
  let component: BodyVmwareComponent;
  let fixture: ComponentFixture<BodyVmwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyVmwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyVmwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
