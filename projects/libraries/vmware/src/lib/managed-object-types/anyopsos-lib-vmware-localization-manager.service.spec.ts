import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareLocalizationManagerService } from './anyopsos-lib-vmware-localization-manager.service';

describe('AnyOpsOSLibVmwareLocalizationManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareLocalizationManagerService = TestBed.get(AnyOpsOSLibVmwareLocalizationManagerService);
    expect(service).toBeTruthy();
  });
});
