import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerImportDistributedSwitchComponent } from './anyopsos-modal-infrastructure-manager-import-distributed-switch.component';

describe('AnyOpsOSModalInfrastructureManagerImportDistributedSwitchComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerImportDistributedSwitchComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerImportDistributedSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerImportDistributedSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerImportDistributedSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
