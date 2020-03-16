import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyopsosModalMonitorImportComponent } from './anyopsos-modal-monitor-import.component';

describe('AnyopsosModalMonitorImportComponent', () => {
  let component: AnyopsosModalMonitorImportComponent;
  let fixture: ComponentFixture<AnyopsosModalMonitorImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyopsosModalMonitorImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyopsosModalMonitorImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
