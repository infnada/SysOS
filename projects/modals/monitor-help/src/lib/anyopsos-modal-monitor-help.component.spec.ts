import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyopsosModalMonitorHelpComponent } from './anyopsos-modal-monitor-help.component';

describe('AnyopsosModalMonitorHelpComponent', () => {
  let component: AnyopsosModalMonitorHelpComponent;
  let fixture: ComponentFixture<AnyopsosModalMonitorHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyopsosModalMonitorHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyopsosModalMonitorHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
