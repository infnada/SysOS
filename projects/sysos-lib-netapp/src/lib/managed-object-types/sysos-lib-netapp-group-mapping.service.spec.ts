import { TestBed } from '@angular/core/testing';

import { SysosLibNetappGroupMappingService } from './sysos-lib-netapp-group-mapping.service';

describe('SysosLibNetappGroupMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappGroupMappingService = TestBed.get(SysosLibNetappGroupMappingService);
    expect(service).toBeTruthy();
  });
});
