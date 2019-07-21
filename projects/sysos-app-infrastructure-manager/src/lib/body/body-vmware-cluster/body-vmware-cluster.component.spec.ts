import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyVmwareClusterComponent } from './body-vmware-cluster.component';

describe('BodyVmwareClusterComponent', () => {
  let component: BodyVmwareClusterComponent;
  let fixture: ComponentFixture<BodyVmwareClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyVmwareClusterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyVmwareClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
