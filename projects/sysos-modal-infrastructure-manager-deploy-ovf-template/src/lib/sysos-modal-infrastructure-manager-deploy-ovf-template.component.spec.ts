import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerDeployOvfTemplateComponent } from './sysos-modal-infrastructure-manager-deploy-ovf-template.component';

describe('SysosModalInfrastructureManagerDeployOvfTemplateComponent', () => {
  let component: SysosModalInfrastructureManagerDeployOvfTemplateComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerDeployOvfTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerDeployOvfTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerDeployOvfTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
