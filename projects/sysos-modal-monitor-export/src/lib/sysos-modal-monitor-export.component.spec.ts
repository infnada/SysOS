import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalMonitorExportComponent } from './sysos-modal-monitor-export.component';

describe('SysosModalMonitorExportComponent', () => {
  let component: SysosModalMonitorExportComponent;
  let fixture: ComponentFixture<SysosModalMonitorExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalMonitorExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalMonitorExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
