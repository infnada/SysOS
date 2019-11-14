import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalMonitorImportComponent } from './anyopsos-modal-monitor-import.component';

describe('AnyOpsOSModalMonitorImportComponent', () => {
  let component: AnyOpsOSModalMonitorImportComponent;
  let fixture: ComponentFixture<AnyOpsOSModalMonitorImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalMonitorImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalMonitorImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
