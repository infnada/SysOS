import { TestBed } from '@angular/core/testing';

import { SysosLibVmwareManagedObjectViewService } from './sysos-lib-vmware-managed-object-view.service';

describe('SysosLibVmwareManagedObjectViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibVmwareManagedObjectViewService = TestBed.get(SysosLibVmwareManagedObjectViewService);
    expect(service).toBeTruthy();
  });
});
