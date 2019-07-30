import { TestBed } from '@angular/core/testing';

import { SysosLibNetappTapeMcInfoService } from './sysos-lib-netapp-tape-mc-info.service';

describe('SysosLibNetappTapeMcInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappTapeMcInfoService = TestBed.get(SysosLibNetappTapeMcInfoService);
    expect(service).toBeTruthy();
  });
});
