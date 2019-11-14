import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalMonitorExportComponent } from './anyopsos-modal-monitor-export.component';

describe('AnyOpsOSModalMonitorExportComponent', () => {
  let component: AnyOpsOSModalMonitorExportComponent;
  let fixture: ComponentFixture<AnyOpsOSModalMonitorExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalMonitorExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalMonitorExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
