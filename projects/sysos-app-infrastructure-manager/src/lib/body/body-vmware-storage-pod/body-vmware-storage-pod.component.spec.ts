import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyVmwareStoragePodComponent } from './body-vmware-storage-pod.component';

describe('BodyVmwareStoragePodComponent', () => {
  let component: BodyVmwareStoragePodComponent;
  let fixture: ComponentFixture<BodyVmwareStoragePodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyVmwareStoragePodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyVmwareStoragePodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
