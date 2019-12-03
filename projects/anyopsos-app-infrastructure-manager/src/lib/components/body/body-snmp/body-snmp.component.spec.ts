import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodySnmpComponent } from './body-snmp.component';

describe('BodySnmpComponent', () => {
  let component: BodySnmpComponent;
  let fixture: ComponentFixture<BodySnmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodySnmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodySnmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
