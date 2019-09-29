import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalMonitorHelpComponent } from './sysos-modal-monitor-help.component';

describe('SysosModalMonitorHelpComponent', () => {
  let component: SysosModalMonitorHelpComponent;
  let fixture: ComponentFixture<SysosModalMonitorHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalMonitorHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalMonitorHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
