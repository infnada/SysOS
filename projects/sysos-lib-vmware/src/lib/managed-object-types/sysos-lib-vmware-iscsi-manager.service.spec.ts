import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareIscsiManagerService } from './sysos-lib-vmware-iscsi-manager.service';

describe('SysosLibVmwareIscsiManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareIscsiManagerService = TestBed.get(SysosLibVmwareIscsiManagerService);
    expect(service).toBeTruthy();
  });
});
