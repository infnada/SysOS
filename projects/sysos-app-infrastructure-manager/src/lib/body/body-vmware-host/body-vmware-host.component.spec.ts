import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyVmwareHostComponent } from './body-vmware-host.component';

describe('BodyVmwareHostComponent', () => {
  let component: BodyVmwareHostComponent;
  let fixture: ComponentFixture<BodyVmwareHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyVmwareHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyVmwareHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
