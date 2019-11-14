import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerNewDistributedSwitchComponent } from './anyopsos-modal-infrastructure-manager-new-distributed-switch.component';

describe('AnyOpsOSModalInfrastructureManagerNewDistributedSwitchComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerNewDistributedSwitchComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerNewDistributedSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerNewDistributedSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerNewDistributedSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
