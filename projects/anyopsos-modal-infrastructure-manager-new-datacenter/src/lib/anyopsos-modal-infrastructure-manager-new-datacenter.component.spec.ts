import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerNewDatacenterComponent } from './anyopsos-modal-infrastructure-manager-new-datacenter.component';

describe('AnyOpsOSModalInfrastructureManagerNewDatacenterComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerNewDatacenterComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerNewDatacenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerNewDatacenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerNewDatacenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
