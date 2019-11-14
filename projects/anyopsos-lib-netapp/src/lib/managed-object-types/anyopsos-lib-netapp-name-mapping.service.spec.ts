import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappNameMappingService } from './anyopsos-lib-netapp-name-mapping.service';

describe('AnyOpsOSLibNetappNameMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappNameMappingService = TestBed.get(AnyOpsOSLibNetappNameMappingService);
    expect(service).toBeTruthy();
  });
});
