import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerMigrateVmsAnotherNetworkComponent } from './sysos-modal-infrastructure-manager-migrate-vms-another-network.component';

describe('SysosModalInfrastructureManagerMigrateVmsAnotherNetworkComponent', () => {
  let component: SysosModalInfrastructureManagerMigrateVmsAnotherNetworkComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerMigrateVmsAnotherNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerMigrateVmsAnotherNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerMigrateVmsAnotherNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
