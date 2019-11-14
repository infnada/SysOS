import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalMonitorAlarmsComponent } from './anyopsos-modal-monitor-alarms.component';

describe('AnyOpsOSModalMonitorAlarmsComponent', () => {
  let component: AnyOpsOSModalMonitorAlarmsComponent;
  let fixture: ComponentFixture<AnyOpsOSModalMonitorAlarmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalMonitorAlarmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalMonitorAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
