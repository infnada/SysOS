import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareLocalizationManagerService } from './sysos-lib-vmware-localization-manager.service';

describe('SysosLibVmwareLocalizationManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareLocalizationManagerService = TestBed.get(SysosLibVmwareLocalizationManagerService);
    expect(service).toBeTruthy();
  });
});
