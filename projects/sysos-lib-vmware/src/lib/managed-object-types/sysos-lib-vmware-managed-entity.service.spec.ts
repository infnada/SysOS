import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareManagedEntityService } from './sysos-lib-vmware-managed-entity.service';

describe('SysosLibVmwareManagedEntityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareManagedEntityService = TestBed.get(SysosLibVmwareManagedEntityService);
    expect(service).toBeTruthy();
  });
});
