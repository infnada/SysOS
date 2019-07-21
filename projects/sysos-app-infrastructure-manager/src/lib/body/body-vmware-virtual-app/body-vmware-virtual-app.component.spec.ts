import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyVmwareVirtualAppComponent } from './body-vmware-virtual-app.component';

describe('BodyVmwareVirtualAppComponent', () => {
  let component: BodyVmwareVirtualAppComponent;
  let fixture: ComponentFixture<BodyVmwareVirtualAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyVmwareVirtualAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyVmwareVirtualAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
