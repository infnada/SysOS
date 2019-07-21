import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyVmwareDatacenterComponent } from './body-vmware-datacenter.component';

describe('BodyVmwareDatacenterComponent', () => {
  let component: BodyVmwareDatacenterComponent;
  let fixture: ComponentFixture<BodyVmwareDatacenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyVmwareDatacenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyVmwareDatacenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
