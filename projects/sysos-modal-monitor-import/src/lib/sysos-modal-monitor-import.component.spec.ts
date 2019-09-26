import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalMonitorImportComponent } from './sysos-modal-monitor-import.component';

describe('SysosModalMonitorImportComponent', () => {
  let component: SysosModalMonitorImportComponent;
  let fixture: ComponentFixture<SysosModalMonitorImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalMonitorImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalMonitorImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
