import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerKubernetesShellComponent } from './anyopsos-modal-infrastructure-manager-kubernetes-shell.component';

describe('AnyOpsOSModalInfrastructureManagerKubernetesShellComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerKubernetesShellComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerKubernetesShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerKubernetesShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerKubernetesShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
