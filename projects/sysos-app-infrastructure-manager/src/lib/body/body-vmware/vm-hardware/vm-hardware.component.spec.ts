import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmHardwareComponent } from './vm-hardware.component';

describe('VmHardwareComponent', () => {
  let component: VmHardwareComponent;
  let fixture: ComponentFixture<VmHardwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmHardwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmHardwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
