import { TestBed } from '@angular/core/testing';

import { SysosLibNetappNameMappingService } from './sysos-lib-netapp-name-mapping.service';

describe('SysosLibNetappNameMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappNameMappingService = TestBed.get(SysosLibNetappNameMappingService);
    expect(service).toBeTruthy();
  });
});
