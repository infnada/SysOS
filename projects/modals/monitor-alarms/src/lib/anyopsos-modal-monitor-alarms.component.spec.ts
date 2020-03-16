import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyopsosModalMonitorAlarmsComponent } from './anyopsos-modal-monitor-alarms.component';

describe('AnyopsosModalMonitorAlarmsComponent', () => {
  let component: AnyopsosModalMonitorAlarmsComponent;
  let fixture: ComponentFixture<AnyopsosModalMonitorAlarmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyopsosModalMonitorAlarmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyopsosModalMonitorAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
