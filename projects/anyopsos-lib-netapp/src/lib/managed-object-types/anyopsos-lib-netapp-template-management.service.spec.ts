import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappTemplateManagementService } from './anyopsos-lib-netapp-template-management.service';

describe('AnyOpsOSLibNetappTemplateManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappTemplateManagementService = TestBed.get(AnyOpsOSLibNetappTemplateManagementService);
    expect(service).toBeTruthy();
  });
});
