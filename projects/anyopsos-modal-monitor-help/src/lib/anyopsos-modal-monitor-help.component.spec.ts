import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalMonitorHelpComponent } from './anyopsos-modal-monitor-help.component';

describe('AnyOpsOSModalMonitorHelpComponent', () => {
  let component: AnyOpsOSModalMonitorHelpComponent;
  let fixture: ComponentFixture<AnyOpsOSModalMonitorHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalMonitorHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalMonitorHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
