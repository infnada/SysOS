import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappGroupMappingService } from './anyopsos-lib-netapp-group-mapping.service';

describe('AnyOpsOSLibNetappGroupMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappGroupMappingService = TestBed.get(AnyOpsOSLibNetappGroupMappingService);
    expect(service).toBeTruthy();
  });
});
