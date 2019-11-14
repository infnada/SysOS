import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalMonitorOptionsComponent } from './anyopsos-modal-monitor-options.component';

describe('AnyOpsOSModalMonitorOptionsComponent', () => {
  let component: AnyOpsOSModalMonitorOptionsComponent;
  let fixture: ComponentFixture<AnyOpsOSModalMonitorOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalMonitorOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalMonitorOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
