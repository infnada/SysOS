import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyopsosModalMonitorXssComponent } from './anyopsos-modal-monitor-xss.component';

describe('AnyopsosModalMonitorXssComponent', () => {
  let component: AnyopsosModalMonitorXssComponent;
  let fixture: ComponentFixture<AnyopsosModalMonitorXssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyopsosModalMonitorXssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyopsosModalMonitorXssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
