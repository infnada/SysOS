import { TestBed } from '@angular/core/testing';

import { SysosLibNetappEnvironmentService } from './sysos-lib-netapp-environment.service';

describe('SysosLibNetappEnvironmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappEnvironmentService = TestBed.get(SysosLibNetappEnvironmentService);
    expect(service).toBeTruthy();
  });
});
