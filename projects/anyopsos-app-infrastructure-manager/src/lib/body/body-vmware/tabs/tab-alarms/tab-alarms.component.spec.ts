import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAlarmsComponent } from './tab-alarms.component';

describe('TabAlarmsComponent', () => {
  let component: TabAlarmsComponent;
  let fixture: ComponentFixture<TabAlarmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAlarmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
