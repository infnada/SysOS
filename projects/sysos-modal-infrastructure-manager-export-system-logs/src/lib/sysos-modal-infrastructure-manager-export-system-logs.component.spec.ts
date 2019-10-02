import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerExportSystemLogsComponent } from './sysos-modal-infrastructure-manager-export-system-logs.component';

describe('SysosModalInfrastructureManagerExportSystemLogsComponent', () => {
  let component: SysosModalInfrastructureManagerExportSystemLogsComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerExportSystemLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerExportSystemLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerExportSystemLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
