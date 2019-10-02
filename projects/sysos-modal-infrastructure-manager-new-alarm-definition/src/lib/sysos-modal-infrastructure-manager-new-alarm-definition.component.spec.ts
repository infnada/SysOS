import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerNewAlarmDefinitionComponent } from './sysos-modal-infrastructure-manager-new-alarm-definition.component';

describe('SysosModalInfrastructureManagerNewAlarmDefinitionComponent', () => {
  let component: SysosModalInfrastructureManagerNewAlarmDefinitionComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerNewAlarmDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerNewAlarmDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerNewAlarmDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
