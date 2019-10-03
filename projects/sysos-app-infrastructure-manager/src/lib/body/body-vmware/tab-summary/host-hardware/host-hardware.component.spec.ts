import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostHardwareComponent } from './host-hardware.component';

describe('HostHardwareComponent', () => {
  let component: HostHardwareComponent;
  let fixture: ComponentFixture<HostHardwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostHardwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostHardwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
