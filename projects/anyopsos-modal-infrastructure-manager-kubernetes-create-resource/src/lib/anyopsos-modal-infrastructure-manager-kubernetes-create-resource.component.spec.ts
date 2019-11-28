import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerKubernetesCreateResourceComponent } from './anyopsos-modal-infrastructure-manager-kubernetes-create-resource.component';

describe('AnyOpsOSModalInfrastructureManagerKubernetesCreateResourceComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerKubernetesCreateResourceComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerKubernetesCreateResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerKubernetesCreateResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerKubernetesCreateResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
