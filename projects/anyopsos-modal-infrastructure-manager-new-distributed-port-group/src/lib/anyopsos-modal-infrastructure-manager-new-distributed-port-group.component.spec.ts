import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerNewDistributedPortGroupComponent } from './anyopsos-modal-infrastructure-manager-new-distributed-port-group.component';

describe('AnyOpsOSModalInfrastructureManagerNewDistributedPortGroupComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerNewDistributedPortGroupComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerNewDistributedPortGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerNewDistributedPortGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerNewDistributedPortGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
