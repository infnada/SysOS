import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerDeployOvfTemplateComponent } from './anyopsos-modal-infrastructure-manager-deploy-ovf-template.component';

describe('AnyOpsOSModalInfrastructureManagerDeployOvfTemplateComponent', () => {
  let component: AnyOpsOSModalInfrastructureManagerDeployOvfTemplateComponent;
  let fixture: ComponentFixture<AnyOpsOSModalInfrastructureManagerDeployOvfTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalInfrastructureManagerDeployOvfTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalInfrastructureManagerDeployOvfTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
