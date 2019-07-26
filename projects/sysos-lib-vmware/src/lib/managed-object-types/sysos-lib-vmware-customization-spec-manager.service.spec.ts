import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareCustomizationSpecManagerService } from './sysos-lib-vmware-customization-spec-manager.service';

describe('SysosLibVmwareCustomizationSpecManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareCustomizationSpecManagerService = TestBed.get(SysosLibVmwareCustomizationSpecManagerService);
    expect(service).toBeTruthy();
  });
});
