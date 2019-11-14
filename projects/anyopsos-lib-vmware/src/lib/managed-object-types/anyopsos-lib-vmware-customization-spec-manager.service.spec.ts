import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareCustomizationSpecManagerService } from './anyopsos-lib-vmware-customization-spec-manager.service';

describe('AnyOpsOSLibVmwareCustomizationSpecManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareCustomizationSpecManagerService = TestBed.get(AnyOpsOSLibVmwareCustomizationSpecManagerService);
    expect(service).toBeTruthy();
  });
});
