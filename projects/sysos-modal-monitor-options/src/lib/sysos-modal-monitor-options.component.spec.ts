import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalMonitorOptionsComponent } from './sysos-modal-monitor-options.component';

describe('SysosModalMonitorOptionsComponent', () => {
  let component: SysosModalMonitorOptionsComponent;
  let fixture: ComponentFixture<SysosModalMonitorOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalMonitorOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalMonitorOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
