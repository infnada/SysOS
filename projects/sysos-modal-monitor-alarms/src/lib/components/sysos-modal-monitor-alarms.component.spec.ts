import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalMonitorAlarmsComponent } from './sysos-modal-monitor-alarms.component';

describe('SysosModalMonitorAlarmsComponent', () => {
  let component: SysosModalMonitorAlarmsComponent;
  let fixture: ComponentFixture<SysosModalMonitorAlarmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalMonitorAlarmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalMonitorAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
