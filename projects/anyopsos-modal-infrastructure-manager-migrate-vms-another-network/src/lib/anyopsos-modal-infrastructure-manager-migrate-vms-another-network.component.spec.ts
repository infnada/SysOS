import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerMigrateVmsAnotherNetworkComponent } from './anyopsos-modal-infrastructure-manager-migrate-vms-another-network.component';

describe('AnyOpsOSModalInfrastructureManagerMigrateVmsAnotherNetworkComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerMigrateVmsAnotherNetworkComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerMigrateVmsAnotherNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerMigrateVmsAnotherNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerMigrateVmsAnotherNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
