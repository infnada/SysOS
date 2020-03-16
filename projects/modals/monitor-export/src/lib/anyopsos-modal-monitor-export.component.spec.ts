import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyopsosModalMonitorExportComponent } from './anyopsos-modal-monitor-export.component';

describe('AnyopsosModalMonitorExportComponent', () => {
  let component: AnyopsosModalMonitorExportComponent;
  let fixture: ComponentFixture<AnyopsosModalMonitorExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyopsosModalMonitorExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyopsosModalMonitorExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
