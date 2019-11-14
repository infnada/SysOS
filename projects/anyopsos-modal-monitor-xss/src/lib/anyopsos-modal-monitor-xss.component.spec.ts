import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalMonitorXssComponent } from './anyopsos-modal-monitor-xss.component';

describe('AnyOpsOSModalMonitorXssComponent', () => {
  let component: AnyOpsOSModalMonitorXssComponent;
  let fixture: ComponentFixture<AnyOpsOSModalMonitorXssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalMonitorXssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalMonitorXssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
