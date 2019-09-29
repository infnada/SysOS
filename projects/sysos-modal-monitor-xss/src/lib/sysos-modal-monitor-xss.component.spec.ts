import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalMonitorXssComponent } from './sysos-modal-monitor-xss.component';

describe('SysosModalMonitorXssComponent', () => {
  let component: SysosModalMonitorXssComponent;
  let fixture: ComponentFixture<SysosModalMonitorXssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalMonitorXssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalMonitorXssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
