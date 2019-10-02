import { TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerDeployOvfTemplateService } from './sysos-modal-infrastructure-manager-deploy-ovf-template.service';

describe('SysosModalInfrastructureManagerDeployOvfTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosModalInfrastructureManagerDeployOvfTemplateService = TestBed.get(SysosModalInfrastructureManagerDeployOvfTemplateService);
    expect(service).toBeTruthy();
  });
});
