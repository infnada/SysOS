import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostConfigurationComponent } from './host-configuration.component';

describe('HostConfigurationComponent', () => {
  let component: HostConfigurationComponent;
  let fixture: ComponentFixture<HostConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
