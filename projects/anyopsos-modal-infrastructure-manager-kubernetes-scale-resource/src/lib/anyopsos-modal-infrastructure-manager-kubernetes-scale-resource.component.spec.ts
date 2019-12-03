import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerKubernetesScaleResourceComponent } from './anyopsos-modal-infrastructure-manager-kubernetes-scale-resource.component';

describe('AnyOpsOSModalInfrastructureManagerKubernetesScaleResourceComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerKubernetesScaleResourceComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerKubernetesScaleResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerKubernetesScaleResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerKubernetesScaleResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
