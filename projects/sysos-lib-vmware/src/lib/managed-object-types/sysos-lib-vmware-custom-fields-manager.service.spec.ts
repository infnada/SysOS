import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareCustomFieldsManagerService } from './sysos-lib-vmware-custom-fields-manager.service';

describe('SysosLibVmwareCustomFieldsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareCustomFieldsManagerService = TestBed.get(SysosLibVmwareCustomFieldsManagerService);
    expect(service).toBeTruthy();
  });
});
