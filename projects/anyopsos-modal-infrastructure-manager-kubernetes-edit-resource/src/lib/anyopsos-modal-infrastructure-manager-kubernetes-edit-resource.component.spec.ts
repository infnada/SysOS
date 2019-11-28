import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerKubernetesEditResourceComponent } from './anyopsos-modal-infrastructure-manager-kubernetes-edit-resource.component';

describe('AnyOpsOSModalInfrastructureManagerKubernetesEditResourceComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerKubernetesEditResourceComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerKubernetesEditResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerKubernetesEditResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerKubernetesEditResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
