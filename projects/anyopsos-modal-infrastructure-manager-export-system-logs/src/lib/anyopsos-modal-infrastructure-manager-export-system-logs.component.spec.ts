import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerExportSystemLogsComponent } from './anyopsos-modal-infrastructure-manager-export-system-logs.component';

describe('AnyOpsOSModalInfrastructureManagerExportSystemLogsComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerExportSystemLogsComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerExportSystemLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerExportSystemLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerExportSystemLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
