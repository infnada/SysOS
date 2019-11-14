import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibVmwareManagedEntityService } from './anyopsos-lib-vmware-managed-entity.service';

describe('AnyOpsOSLibVmwareManagedEntityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibVmwareManagedEntityService = TestBed.get(AnyOpsOSLibVmwareManagedEntityService);
    expect(service).toBeTruthy();
  });
});
