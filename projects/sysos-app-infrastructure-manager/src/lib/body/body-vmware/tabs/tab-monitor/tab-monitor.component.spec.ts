import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMonitorComponent } from './tab-monitor.component';

describe('TabMonitorComponent', () => {
  let component: TabMonitorComponent;
  let fixture: ComponentFixture<TabMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
