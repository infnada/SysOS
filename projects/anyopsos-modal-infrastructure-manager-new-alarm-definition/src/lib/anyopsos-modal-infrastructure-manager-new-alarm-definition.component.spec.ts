import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerNewAlarmDefinitionComponent } from './anyopsos-modal-infrastructure-manager-new-alarm-definition.component';

describe('AnyOpsOSModalInfrastructureManagerNewAlarmDefinitionComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerNewAlarmDefinitionComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerNewAlarmDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerNewAlarmDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerNewAlarmDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
