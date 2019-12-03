import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerKubernetesLogsComponent } from './anyopsos-modal-infrastructure-manager-kubernetes-logs.component';

describe('AnyOpsOSModalInfrastructureManagerKubernetesLogsComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerKubernetesLogsComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerKubernetesLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerKubernetesLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerKubernetesLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
