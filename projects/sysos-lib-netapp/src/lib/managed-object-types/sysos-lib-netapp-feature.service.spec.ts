import { TestBed } from '@angular/core/testing';

import { SysosLibNetappFeatureService } from './sysos-lib-netapp-feature.service';

describe('SysosLibNetappFeatureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappFeatureService = TestBed.get(SysosLibNetappFeatureService);
    expect(service).toBeTruthy();
  });
});
