import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyopsosModalMonitorOptionsComponent } from './anyopsos-modal-monitor-options.component';

describe('AnyopsosModalMonitorOptionsComponent', () => {
  let component: AnyopsosModalMonitorOptionsComponent;
  let fixture: ComponentFixture<AnyopsosModalMonitorOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyopsosModalMonitorOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyopsosModalMonitorOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
